"use strict";
// import * as dotenv from  'dotenv'
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config()
const PORT = process.env.PORT || 3001;
const IMAGES = process.env.IMAGES_FOLDER || './images';
const THUMBS = process.env.THUMBS_FOLDER || '.images/thumbs';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URL_TEST = 'postgresql://prisma:prisma@localhost:5431/galleria_tests?schema=test';
const DB_URL = 'postgresql://admin:password123@localhost:6500/galleria_db?schema=public';
exports.default = {
    IMAGES,
    THUMBS,
    PORT,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    REDIS_URL,
    DATABASE_URL,
    NODE_ENV,
    DB_URL_TEST,
    DB_URL
};
