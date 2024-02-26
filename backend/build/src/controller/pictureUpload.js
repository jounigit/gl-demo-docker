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
exports.pictureUpload = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helper_1 = require("./helper");
const config_1 = __importDefault(require("../utils/config"));
const app_1 = require("../app");
const IMAGES = config_1.default.IMAGES;
const THUMBS = config_1.default.THUMBS;
function ensureDir(path) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.mkdir(path, { recursive: true });
    });
}
const pictureUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file === undefined)
        return res.status(400).send('No file sent');
    const uploadedFile = req.file.path;
    const imgBuffer = yield promises_1.default.readFile(req.file.path);
    const ext = path_1.default.extname(req.file.originalname).toLowerCase();
    const newName = Date.now() + ext;
    const imgSrc = `${IMAGES}/${newName}`;
    const thumb = `${THUMBS}/${newName}`;
    (0, helper_1.validations)(ext, req.file.size, res);
    function resizeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ensureDir(THUMBS)
                .then(() => (0, helper_1.resizeImage)(imgBuffer, uploadedFile, 600, imgSrc))
                .then(() => (0, helper_1.resizeImage)(imgBuffer, uploadedFile, 200, thumb))
                .then(() => (0, helper_1.deleteFile)(uploadedFile))
                .then(() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield app_1.prisma.picture.create({
                    data: {
                        title: ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) || newName,
                        image: newName
                    }
                });
            }));
        });
    }
    resizeAll()
        .then(() => {
        testFiles(imgSrc);
        testFiles(thumb);
    });
    testFiles(thumb);
    return res.json('File Uploaded Successfully!');
});
exports.pictureUpload = pictureUpload;
function testFiles(src) {
    if (fs_1.default.existsSync(src)) {
        console.log(`${src} exists.`);
    }
    else {
        console.error(`${src} does not exist.`);
    }
}
// function testFiles(params:type) {
//     if (fs.existsSync(imgSrc)  ) {
//         res.json({image: newName})
//     } else {
//         res.status(500).send('Server error')
//     }
// }
// .then(async () => {
//     await prisma.picture.create({
//         data : {
//             title: req.file?.originalname  || newName,
//             image: newName
//         }
//     })
// })
