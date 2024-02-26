"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const album_routes_1 = __importDefault(require("./album.routes"));
const picture_routes_1 = __importDefault(require("./picture.routes"));
const login_routes_1 = __importDefault(require("./login.routes"));
const albumsOnPicture_routes_1 = __importDefault(require("./albumsOnPicture.routes"));
const routes = (0, express_1.Router)();
routes.use('/users', user_routes_1.default);
routes.use('/albums', album_routes_1.default);
routes.use('/pictures', picture_routes_1.default);
routes.use('/login', login_routes_1.default);
routes.use('/album-picture', albumsOnPicture_routes_1.default);
exports.default = routes;
