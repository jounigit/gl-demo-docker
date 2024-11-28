"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAuth = void 0;
const config_1 = __importDefault(require("../utils/config"));
const express_jwt_1 = require("express-jwt");
exports.routeAuth = (0, express_jwt_1.expressjwt)({ secret: `${config_1.default.JWT_SECRET}`, algorithms: ['HS256'] });
