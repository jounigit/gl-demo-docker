"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
};
const errorHandler = (err, _, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({ error: 'invalid token' });
    }
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'unauthorized' });
    }
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        res.status(400).json({ error: 'invalid request, check your server logs for more info' });
    }
    if (err instanceof library_1.PrismaClientValidationError) {
        res.status(500).json({ error: 'an unknown error occured, check your server logs for more info' });
    }
    next(err);
};
exports.default = {
    unknownEndpoint,
    errorHandler
};
