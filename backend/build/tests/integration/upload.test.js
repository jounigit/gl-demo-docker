"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("src/app"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.resolve(__dirname, '../fixtures/test.jpg');
(0, vitest_1.test)('uploads a picture and creates a new record in the database', async () => {
    const response = await (0, supertest_1.default)(app_1.default)
        .post('/api/picture/picture-upload')
        .attach('file', filePath)
        .field('title', 'Test Picture')
        .expect(200);
    (0, vitest_1.expect)(response.body).toHaveProperty('id');
    (0, vitest_1.expect)(response.body).toHaveProperty('title', 'Test Picture');
    (0, vitest_1.expect)(response.body).toHaveProperty('image', 'test.jpg');
    (0, vitest_1.expect)(response.body).toHaveProperty('userID', 1);
    (0, vitest_1.expect)(response.body).toHaveProperty('createdAt');
    (0, vitest_1.expect)(response.body).toHaveProperty('updatedAt');
    const fileExists = fs_1.default.existsSync(filePath);
    (0, vitest_1.expect)(fileExists).toBe(false);
});
(0, vitest_1.test)('returns an error if the file is too large', async () => {
    const largeFilePath = path_1.default.resolve(__dirname, '../fixtures/large-test.jpg');
    const stats = fs_1.default.statSync(largeFilePath);
    const fileSizeInMB = stats.size / (1024 * 1024);
    const response = await (0, supertest_1.default)(app_1.default)
        .post('/api/picture/picture-upload')
        .attach('file', largeFilePath)
        .field('title', 'Large Test Picture')
        .expect(400);
    (0, vitest_1.expect)(response.body).toHaveProperty('message', `File too large! Maximum file size is 2mb. Received file size: ${fileSizeInMB}mb`);
});
(0, vitest_1.test)('returns an error if the file type is invalid', async () => {
    const invalidFilePath = path_1.default.resolve(__dirname, '../fixtures/test.txt');
    const response = await (0, supertest_1.default)(app_1.default)
        .post('/api/picture/picture-upload')
        .attach('file', invalidFilePath)
        .field('title', 'Invalid Test Picture')
        .expect(400);
    (0, vitest_1.expect)(response.body).toHaveProperty('message', 'Invalid file type!');
});
