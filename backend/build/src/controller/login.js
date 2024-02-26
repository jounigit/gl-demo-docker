"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../app");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user;
    let passwordCorrect;
    if (email) {
        user = yield app_1.prisma.user.findUnique({ where: { email } });
    }
    if (user) {
        passwordCorrect = yield bcrypt_1.default.compare(password, user.password);
    }
    if (!(user && passwordCorrect)) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const userForToken = {
        username: user.name,
        id: user.id
    };
    const token = jsonwebtoken_1.default.sign(userForToken, process.env.JWT_SECRET);
    // Return the user and token as JSON
    res.status(200).json({
        token,
        user: {
            name: user.name,
            id: user.id
        },
    });
});
exports.default = { login };
