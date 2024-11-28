"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../utils/config"));
const secret = config_1.default.JWT_SECRET;
function generateAccessToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };
    // const secret = config.JWT_SECRET! // eslint-disable-line no-negated-in-lhs
    const options = {
        expiresIn: '1h',
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
exports.generateAccessToken = generateAccessToken;
function verifyAccessToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { success: true, data: decoded };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return { success: false, error: 'Invalid token' };
        }
        else {
            throw error;
        }
    }
}
exports.verifyAccessToken = verifyAccessToken;
