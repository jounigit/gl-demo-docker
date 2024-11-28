"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userFromHeader_1 = require("../userFromHeader");
const redis_1 = require("../../services/redis");
const logout = async (req, res) => {
    const user = (0, userFromHeader_1.getUserFromHeader)(req.headers['authorization']);
    console.log(`Logout user: ${user}`);
    if (!user || !user.id) {
        return res.status(400).json({ error: 'Missing authentication' });
    }
    const key = `user:${user.id}`;
    try {
        const red = await (0, redis_1.removeFromCache)(key);
        console.log(`Redis result ${red}`);
        res.status(204).json({ message: 'Logged out' });
    }
    catch (err) {
        console.log('Error to logout', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.default = logout;
