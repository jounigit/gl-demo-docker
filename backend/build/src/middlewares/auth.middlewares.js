"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const prisma_1 = require("../services/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const api_errors_1 = require("../helpers/api-errors");
const verifyToken = async (req, _, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization && authorization.split(' ')[1] || '';
        if (!token || !authorization) {
            throw new api_errors_1.UnauthorizedError();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        if (!payload)
            throw new api_errors_1.UnauthorizedError();
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                id: payload.id
            }
        });
        if (!user)
            throw new api_errors_1.UnauthorizedError();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...loggedUser } = user;
        req.user = loggedUser;
        next();
    }
    catch (error) {
        throw new api_errors_1.ForbiddenError();
    }
};
exports.verifyToken = verifyToken;
