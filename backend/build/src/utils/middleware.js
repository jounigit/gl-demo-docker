"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const userFromHeader_1 = require("../controller/userFromHeader");
const api_errors_1 = require("../helpers/api-errors");
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
        // res.status(400).json({ error: 'invalid request, check your server logs for more info' })
        res.status(400).json({ error: err.message || 'Invalid request.' });
    }
    if (err instanceof library_1.PrismaClientValidationError) {
        res.status(500).json({ error: 'an unknown error occured, check your server logs for more info' });
    }
    res.json({ error: err.message });
    next(err);
};
// if (error.name === 'CastError') {
//   return response.status(400).send({ error: 'malformatted id' })
// }
// if (error.name === 'ValidationError') {
//   return response.status(400).json({ error: error.message })
// }
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // return res.status(401).json({ error:'Not authorized' })
        throw new api_errors_1.UnauthorizedError();
    }
    const user = (0, userFromHeader_1.getUserFromHeader)(authHeader);
    console.log(user);
    if (!user)
        return res.status(400).json({ error: 'Not authorized' });
    if (user) {
        req.user = user;
    }
    next();
}
exports.default = {
    unknownEndpoint,
    errorHandler,
    authenticateToken
};
