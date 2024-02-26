"use strict";
// import { NextFunction, Request, Response } from 'express'
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err) => {
    console.log('Error Handler Middleware');
    console.log(`Status Code : ${err.status || 500}`);
    console.log(`Message : ${err.message || 'Internal Server Error'}`);
    process.exit();
};
exports.errorHandler = errorHandler;
