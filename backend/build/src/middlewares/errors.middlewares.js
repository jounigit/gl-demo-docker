"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const errors = (error, _, res) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : 'There was an internal server error.';
    return res.status(statusCode).json({
        statusCode,
        message: message
    });
};
exports.errors = errors;
