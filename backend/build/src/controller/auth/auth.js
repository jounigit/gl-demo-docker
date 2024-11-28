"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.logout = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { prisma } from '../app'
const redis_1 = require("../../services/redis");
const userFromHeader_1 = require("../userFromHeader");
const prisma_1 = require("../../services/prisma");
const logout = async (req, res) => {
    const user = (0, userFromHeader_1.getUserFromHeader)(req.headers['authorization']);
    if (!user || !user.id) {
        return res.status(400).json({ error: 'Missing authentication' });
    }
    const key = `user:${user.id}`;
    try {
        await (0, redis_1.removeFromCache)(key);
        res.status(204).json({ message: 'Logged out' });
    }
    catch (err) {
        console.log('Error to logout', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.logout = logout;
// *****************************************************
const login = async (req, res) => {
    const { email, password } = req.body;
    let user;
    let passwordCorrect;
    if (email) {
        user = await prisma_1.prisma.user.findUnique({ where: { email } });
    }
    if (user) {
        passwordCorrect = await bcrypt_1.default.compare(password, user.password);
    }
    if (!(user && passwordCorrect)) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const userForToken = {
        id: user.id,
        username: user.username,
        email: user.email
    };
    const token = jsonwebtoken_1.default.sign(userForToken, process.env.JWT_SECRET);
    const toCache = {
        token,
        user: userForToken
    };
    // userForToken, process.env.JWT_SECRET!
    const key = `user:${user.id}`;
    try {
        const red = await (0, redis_1.setToCache)(key, JSON.stringify(toCache));
        console.log(`Redis result ${red}`);
        // Return the user and token as JSON
        res.status(200).json(toCache);
    }
    catch (error) {
        console.log('Error setting cache ', error);
    }
};
exports.login = login;
// export default {
//   login,
//   logout
// }
