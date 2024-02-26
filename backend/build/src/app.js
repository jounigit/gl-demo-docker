"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./utils/config"));
const middleware_1 = __importDefault(require("./utils/middleware"));
// import UserRouter from "./routes/user";
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.get('/health', (req, res) => {
            res.send('ok');
        });
        // Register API routes
        app.use('/api', routes_1.default);
        app.use(middleware_1.default.unknownEndpoint);
        app.use(middleware_1.default.errorHandler);
        // Catch unregistered routes
        // app.all('*', (req: Request, res: Response) => {
        //   res.status(404).json({ error: `Route ${req.originalUrl} not found` })
        // })
        // app.use(function (err:  Error, req: Request, res: Response, next: NextFunction): void {
        //   if (err.name === 'UnauthorizedError') {
        //     res.status(401).send('invalid token...')
        //   } else {
        //     next(err)
        //   }
        // })
        app.listen(config_1.default.PORT, () => {
            console.log(`Server is listening on port ${config_1.default.PORT}`);
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$connect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
