"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const albums_routes_1 = __importDefault(require("./albums.routes"));
const album_routes_1 = __importDefault(require("./album.routes"));
const picture_routes_1 = __importDefault(require("./picture.routes"));
const albumsOnPicture_routes_1 = __importDefault(require("./albumsOnPicture.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const routes = (0, express_1.Router)();
routes.use('/users', user_routes_1.default);
routes.use('/albums', albums_routes_1.default);
routes.use('/album', album_routes_1.default);
routes.use('/pictures', picture_routes_1.default);
routes.use('/album-picture', albumsOnPicture_routes_1.default);
routes.use('/', auth_routes_1.default);
exports.default = routes;
