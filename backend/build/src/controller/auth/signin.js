"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../services/prisma");
const user_model_1 = require("../../model/user.model");
const signin = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        returnError(res, 'Missing credentials');
    const existingUser = await prisma_1.prisma.user.findFirst({
        where: { email }
    });
    if (existingUser)
        returnError(res, 'Email already in use');
    const saltRounds = 10;
    const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
    const data = {
        username,
        email,
        password: passwordHash
    };
    const newUser = await (0, user_model_1.createUser)(data);
    if (!newUser)
        throw new Error('Failed to create user');
    return res.status(201).json(newUser);
};
exports.default = signin;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function returnError(res, msg) {
    return res.status(400).json({ error: msg });
}
// try {
//   const newUser = await prisma.user.create({ data })
//   if (!newUser) throw new Error('Failed to create user')
//   else return res.status(201).json(newUser)
// } catch (err) {
//   console.error(err)
//   return res.status(500).json({ error: err })
// }
