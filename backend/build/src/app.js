"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = __importDefault(require("./utils/middleware"));
// import config from './utils/config'
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/images', express_1.default.static(node_path_1.default.join(__dirname, '../images')));
app.use('/thumbs', express_1.default.static(node_path_1.default.join(__dirname, '../images/thumbs')));
app.get('/health', (req, res) => {
    res.send('ok');
});
app.get('/protected', middleware_1.default.authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});
// Register API routes
app.use('/api', routes_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
