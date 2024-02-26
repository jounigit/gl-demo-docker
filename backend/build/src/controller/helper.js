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
exports.resizeImage = exports.deleteFile = exports.validations = void 0;
const util_1 = __importDefault(require("util"));
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
const sizeOf = util_1.default.promisify(require('image-size'));
function validations(ext, fileSize, res) {
    if (['.jpg', '.jpeg', '.png'].indexOf(ext) === -1) {
        return res.send({ error: 'Invalid file type!' });
    }
    // Allowed file size in mb
    const maxSize = 2;
    if (fileSize > maxSize * 1024 * 1024) {
        return res.status(400).send({ error: `File too large! Maximum file size is ${maxSize}mb.` });
    }
}
exports.validations = validations;
function deleteFile(srcUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.unlink(srcUrl);
            console.log('File deleted successfully');
        }
        catch (error) {
            console.error('Error deleting file:', error);
        }
    });
}
exports.deleteFile = deleteFile;
function resizeImage(buf, srcUrl, size, destUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = yield getOptionsByOrientation(srcUrl, size);
        try {
            yield (0, sharp_1.default)(buf)
                .resize(options)
                .toFile(destUrl);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.resizeImage = resizeImage;
function getOptionsByOrientation(file, size) {
    return __awaiter(this, void 0, void 0, function* () {
        const orientation = yield getOrientation(file);
        return getOptions(orientation, size);
    });
}
function getOrientation(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dimensions = yield sizeOf(file);
            console.log('Dimensions: ', dimensions);
            return dimensions.width < dimensions.height ? 'isPortrait' : 'isLandscape';
        }
        catch (err) {
            console.error(err);
            return 'square';
        }
    });
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
