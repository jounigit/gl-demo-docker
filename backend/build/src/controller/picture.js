"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.upload = exports.getOne = exports.getAll = void 0;
const helper_1 = require("./helper");
const config_1 = __importDefault(require("../utils/config"));
const prisma_1 = require("../services/prisma");
const picture_model_1 = require("../model/picture.model");
const pictureUpload_model_1 = require("../model/pictureUpload.model");
// Returns an picture or throws an error
//**************** Get all pictures */
const getAll = async (req, res) => {
    const pictures = await (0, picture_model_1.getPictures)();
    return res.status(200).json(pictures);
};
exports.getAll = getAll;
// ********************** Get picture  by ID *************************** //
const getOne = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    // Check if the album exists in the database
    const picture = await (0, picture_model_1.getPictureOrThrowError)(id);
    return res.status(200).json(picture);
};
exports.getOne = getOne;
// ********************** Upload picture *************************** //
const upload = async (req, res) => {
    if (!req.user || req.file === undefined) {
        return res.status(400).send('No file sent or user not logged in');
    }
    try {
        console.log({ req });
        const result = await (0, pictureUpload_model_1.pictureUploadModel)(req.file, req.user);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
exports.upload = upload;
// ****************** Create a new picture  ***********************
const create = async (req, res) => {
    const { title, year, content, image, userID } = req.body;
    if (!image || !title || !userID)
        throw new Error('Missing data');
    const data = {
        title,
        year,
        content,
        image,
        userID: Number.parseInt(userID)
    };
    const picture = await (0, picture_model_1.createPicture)(data);
    if (!picture)
        throw new Error('Could not add the picture');
    return res.status(201).json({ data: picture, message: 'Picture created!' });
};
exports.create = create;
// ***************** Update picture *******************************
const update = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (!Object.keys(req.body).length)
        throw new Error('Nothing to update.');
    // Check if the album exists in the database
    await (0, picture_model_1.getPictureOrThrowError)(id);
    const picture = await prisma_1.prisma.picture.update({
        where: { id },
        data: { ...req.body },
    });
    if (!picture)
        throw new Error('Could not update the picture');
    return res.status(200).json(picture);
};
exports.update = update;
// ********* Delete a specific picture by its ID **********************
const remove = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const picture = await (0, picture_model_1.deletePicture)(id);
    const bigPicture = (0, helper_1.makeSourcePath)(config_1.default.IMAGES, picture.image);
    const smallPicture = (0, helper_1.makeSourcePath)(config_1.default.THUMBS, picture.image);
    (0, helper_1.deleteFileIfExists)(bigPicture);
    (0, helper_1.deleteFileIfExists)(smallPicture);
    return res.status(200).json({ message: 'Picture deleted successfully' });
};
exports.remove = remove;
