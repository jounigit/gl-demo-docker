"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromHeader = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
function getAuthTokenFromHeader(header) {
    const authHeader = header.split(' ');
    console.log(`Auth user: ${authHeader}`);
    if (authHeader[0].toLowerCase() === 'bearer') {
        return authHeader[1];
    }
    return null;
}
function decodeAuthToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET); //
        return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
        };
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
function getUserFromHeader(header) {
    if (!header) {
        return null;
    }
    const token = getAuthTokenFromHeader(header);
    if (!token) {
        throw new Error('Invalid Authorization Header');
    }
    return decodeAuthToken(token);
}
exports.getUserFromHeader = getUserFromHeader;
