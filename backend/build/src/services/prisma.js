"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// import { PrismaSlug } from 'prisma-slug'
const config_1 = __importDefault(require("../utils/config"));
exports.prisma = new client_1.PrismaClient({
    datasources: {
        db: { url: config_1.default.DATABASE_URL },
        // db: { url: config.NODE_ENV === 'test' ? config.DB_URL_TEST : config.DB_URL },
    },
    log: ['query', 'error']
}).$extends({
    query: {
        album: {
            create({ args, query }) {
                if (args.data?.title) {
                    const slug = args.data?.title.toLowerCase().replace(/ /g, '-');
                    args.data.slug = slug;
                }
                return query(args);
            },
            update({ args, query }) {
                // If title is updated, regenerate the slug field
                if (args.data?.title) {
                    const slug = args.data?.title.toString().toLowerCase().replace(/ /g, '-');
                    args.data.slug = slug;
                }
                return query(args);
            },
        },
    }
});
