"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.deleteFileIfExists = exports.makeSourcePath = exports.imageValidations = void 0;
const util_1 = __importDefault(require("util"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
// import fsPromise from  'fs/promises'
const sizeOf = util_1.default.promisify(require('image-size'));
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
const deleteFileIfExists = (filePath) => {
    if ((0, fs_1.existsSync)(filePath)) {
        (0, fs_1.unlinkSync)(filePath);
    }
};
exports.deleteFileIfExists = deleteFileIfExists;
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
