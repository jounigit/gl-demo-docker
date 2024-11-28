"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../controller/auth/login"));
const logout_1 = __importDefault(require("../controller/auth/logout"));
const signin_1 = __importDefault(require("../controller/auth/signin"));
const routes = express_1.default.Router();
routes.post('/login', login_1.default);
routes.delete('/logout', logout_1.default);
routes.post('/signin', signin_1.default);
exports.default = routes;
