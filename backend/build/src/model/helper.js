"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFilesExistence = exports.isAllFiles = exports.checkFileExists = exports.resizeImage = exports.deleteFileIfExists = exports.makeSourcePath = exports.imageValidations = exports.ensureDir = void 0;
const node_util_1 = __importDefault(require("node:util"));
const sharp_1 = __importDefault(require("sharp"));
const node_fs_1 = require("node:fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const sizeOf = node_util_1.default.promisify(require('image-size'));
async function ensureDir(path) {
    await promises_1.default.mkdir(path, { recursive: true });
}
exports.ensureDir = ensureDir;
function imageValidations(ext, fileSize, res) {
    if (['.jpg', '.jpeg', '.png'].indexOf(ext) === -1) {
        return res.send({ error: 'Invalid file type!' });
    }
    // Allowed file size in mb
    const maxSize = 2;
    if (fileSize > maxSize * 1024 * 1024) {
        return res.status(400).send({ error: `File too large! Maximum file size is ${maxSize}mb.` });
    }
}
exports.imageValidations = imageValidations;
function makeSourcePath(dir, newName) {
    return `${dir}/${newName}`;
}
exports.makeSourcePath = makeSourcePath;
function deleteFileIfExists(filePath) {
    if ((0, node_fs_1.existsSync)(filePath)) {
        (0, node_fs_1.unlinkSync)(filePath);
    }
}
exports.deleteFileIfExists = deleteFileIfExists;
// export function deleteExtraFiles()
async function resizeImage(buf, srcUrl, size, destUrl) {
    const options = await getOptionsByOrientation(srcUrl, size);
    try {
        await (0, sharp_1.default)(buf)
            .resize(options)
            .toFile(destUrl);
    }
    catch (error) {
        console.log(error);
    }
}
exports.resizeImage = resizeImage;
async function getOptionsByOrientation(file, size) {
    const orientation = await getOrientation(file);
    return getOptions(orientation, size);
}
async function getOrientation(file) {
    try {
        const dimensions = await sizeOf(file);
        console.log('Dimensions: ', dimensions);
        return dimensions.width < dimensions.height ? 'isPortrait' : 'isLandscape';
    }
    catch (err) {
        console.error(err);
        return 'square';
    }
}
function getOptions(orientation, size) {
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let options;
    if (orientation === 'isPortrait') {
        options = {
            width: undefined,
            height: size
        };
    }
    else {
        options = {
            width: size,
            height: undefined
        };
    }
    return options;
}
function checkFileExists(file) {
    return (0, node_fs_1.existsSync)(file);
}
exports.checkFileExists = checkFileExists;
function isAllFiles(files) {
    return files.every(checkFileExists);
}
exports.isAllFiles = isAllFiles;
function checkFilesExistence(files) {
    return files.filter((file) => (0, node_fs_1.existsSync)(file));
}
exports.checkFilesExistence = checkFilesExistence;
