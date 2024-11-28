"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCache = exports.setToCache = exports.getFromCache = void 0;
const redis_1 = require("redis");
const config_1 = __importDefault(require("../utils/config"));
let redisClient;
let isReady;
// const cacheOptions = {
//   url: config.redis.url,
// }
async function createRedisClient() {
    redisClient = (0, redis_1.createClient)({
        url: config_1.default.REDIS_URL
    });
    redisClient.on('error', (err) => console.error(`Redis Error: ${err}`));
    redisClient.on('connect', () => console.info('Redis connected'));
    redisClient.on('reconnecting', () => console.info('Redis reconnecting'));
    redisClient.on('ready', () => {
        isReady = true;
        console.info('Redis ready!');
    });
    await redisClient.connect();
    return redisClient;
}
async function getRedisClient() {
    if (!isReady) {
        redisClient = await createRedisClient();
    }
    return redisClient;
}
async function getFromCache(key) {
    const client = await getRedisClient();
    const value = await client.get(key);
    return value;
}
exports.getFromCache = getFromCache;
async function setToCache(key, value) {
    const client = await getRedisClient();
    return client.set(key, value);
}
exports.setToCache = setToCache;
async function removeFromCache(key) {
    const client = await getRedisClient();
    return client.del(key);
}
exports.removeFromCache = removeFromCache;
