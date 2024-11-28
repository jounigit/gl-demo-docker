"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signin_1 = __importDefault(require("../controller/auth/signin"));
const routes = express_1.default.Router();
routes.post('/', signin_1.default);
exports.default = routes;
