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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePicture = exports.updatePicture = exports.createPicture = exports.getOne = exports.getAll = void 0;
const app_1 = require("../app");
// Get all pictures
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pictures = yield app_1.prisma.picture.findMany();
        return res.status(200).json(pictures);
    }
    catch (error) {
        console.log('Error getting pictures', error);
        return res.status(500).json({ message: 'Server Error' });
    }
});
exports.getAll = getAll;
// Get picture
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const picture = yield app_1.prisma.picture.findUnique({ where: { id: parseInt(id) } });
        if (!picture) {
            return res.status(404).json({ message: 'No picture found with that ID' });
        }
        return res.status(200).json({ data: picture });
    }
    catch (error) {
        console.log(`Error getting picture ${id}`, error);
        return res.status(500).json({ message: `Failed to get picture ${id}` });
    }
});
exports.getOne = getOne;
// Create a new picture
const createPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, year, content, image, userID } = req.body;
    if (!image || !title) {
        return res.status(400).json({ message: 'Missing data' });
    }
    const picture = yield app_1.prisma.picture.create({
        data: {
            title,
            year,
            content,
            image,
            userID: parseInt(userID)
        },
    });
    return res.status(201).json({ data: picture, message: 'Picture created!' });
});
exports.createPicture = createPicture;
// Update picture
const updatePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!Object.keys(req.body).length)
        return res.status(400).json({ message: 'Nothing to update.' });
    const picture = yield app_1.prisma.picture.findUnique({ where: { id } });
    if (!picture)
        return res.status(404).json({ message: 'Could not find the picture.' });
    try {
        const picture = yield app_1.prisma.picture.update({
            where: { id },
            data: Object.assign({}, req.body),
        });
        return res.status(200).json({ data: picture, message: 'Successfully updated' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.updatePicture = updatePicture;
// Delete a specific picture by its ID
const deletePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const picture = yield app_1.prisma.picture.delete({ where: { id } });
    if (!picture) {
        return res.status(404).json({ message: 'Picture not found' });
    }
    return res.status(200).json({ message: 'Picture deleted successfully' });
});
exports.deletePicture = deletePicture;
