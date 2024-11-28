"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../../services/redis");
const prisma_1 = require("../../services/prisma");
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new Error('Missing data or authentication');
    // let user: User | null
    // let passwordCorrect
    // if (email) {
    //   user = await prisma.user.findUnique({ where: { email } })
    // }
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const passwordCorrect = await bcrypt_1.default.compare(password, user.password);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const userForToken = {
        id: user.id,
        username: user.username,
        email: user.email
    };
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
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
        res.status(200).json({
            status: 'success',
            data: toCache,
            message: 'You have successfully logged in.',
        });
    }
    catch (error) {
        console.log('Error setting cache ', error);
    }
};
exports.default = login;
