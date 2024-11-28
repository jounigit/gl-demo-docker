"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pictureUploadModel = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const helper_1 = require("./helper");
const config_1 = __importDefault(require("../utils/config"));
const prisma_1 = require("../services/prisma");
const IMAGES = config_1.default.IMAGES;
const THUMBS = config_1.default.THUMBS;
async function ensureDir(path) {
    await promises_1.default.mkdir(path, { recursive: true });
}
async function pictureUploadModel(file, user) {
    const uploadedFile = file.path;
    const imgBuffer = await promises_1.default.readFile(uploadedFile);
    const ext = node_path_1.default.extname(file.originalname).toLowerCase();
    const newName = Date.now() + ext;
    const imgPath = (0, helper_1.makeSourcePath)(IMAGES, newName);
    const thumbPath = (0, helper_1.makeSourcePath)(THUMBS, newName);
    console.log({ uploadedFile });
    const validationResult = imageValidations(ext, file.size);
    if (!validationResult) {
        throw new Error(`Image validation failed: ${validationResult}`);
    }
    await resizeAll(imgBuffer, uploadedFile, imgPath, thumbPath);
    const images = [imgPath, thumbPath];
    const getExistingFiles = checkFilesExistence(images);
    const isAllFilesDone = await isAllFiles(images);
    if (!isAllFilesDone) {
        removeUselessFiles(getExistingFiles);
        throw new Error('Could not process all files');
    }
    const createdPic = await prisma_1.prisma.picture.create({
        data: {
            title: newName,
            image: newName,
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            userID: user.id
        }
    });
    if (createdPic.image === undefined || createdPic.title === undefined) {
        throw new Error('DB error on saving picture info');
    }
    return createdPic;
}
exports.pictureUploadModel = pictureUploadModel;
// ******************************************************************************
// HELPER FUNCTIONS BELOW
// ******************************************************************************
async function resizeAll(imgBuffer, uploadedFile, imgPath, thumbPath) {
    await ensureDir(THUMBS)
        .then(() => (0, helper_1.resizeImage)(imgBuffer, uploadedFile, 600, imgPath))
        .then(() => (0, helper_1.resizeImage)(imgBuffer, uploadedFile, 200, thumbPath))
        .then(() => (0, helper_1.deleteFileIfExists)(uploadedFile));
}
function removeUselessFiles(getExistingFiles) {
    for (const file of getExistingFiles) {
        (0, helper_1.deleteFileIfExists)(file);
    }
}
function checkFileExists(file) {
    return (0, node_fs_1.existsSync)(file);
}
const isAllFiles = (files) => {
    return files.every(checkFileExists);
};
const checkFilesExistence = (files) => {
    return files.filter((file) => (0, node_fs_1.existsSync)(file));
};
function imageValidations(ext, size) {
    if (['.jpg', '.jpeg', '.png'].indexOf(ext) === -1) {
        return 'Invalid file type!';
    }
    const maxSize = 2;
    if (size > maxSize * 1024 * 1024) {
        return `File too large! Maximum file size is ${maxSize}mb.`;
    }
    return true;
}
