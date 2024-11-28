"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.errorHandler = exports.notFound = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./utils/config"));
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}
exports.notFound = notFound;
function errorHandler(err, _, res) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}
exports.errorHandler = errorHandler;
function isAuthenticated(_err, req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }
    try {
        const token = authorization.split(' ')[1];
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET); //
        req.user = payload;
    }
    catch (err) {
        res.status(401);
        if (err === 'TokenExpiredError') {
            throw new Error(err);
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }
    return next();
}
exports.isAuthenticated = isAuthenticated;
// export default {
//   unknownEndpoint,
//   errorHandler,
//   isAuthenticated
// }
