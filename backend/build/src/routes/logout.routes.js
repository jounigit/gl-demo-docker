"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logout_1 = __importDefault(require("../controller/auth/logout"));
const routes = express_1.default.Router();
routes.delete('/', logout_1.default);
exports.default = routes;
