"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getBySlug = exports.getOne = exports.getAll = exports.getAlbumOrThrowError = void 0;
const prisma_1 = require("../services/prisma");
const api_errors_1 = require("../helpers/api-errors");
const album_model_1 = require("../model/album.model");
// Returns an album or throws an error
async function getAlbumOrThrowError(id) {
    const album = await prisma_1.prisma.album.findUnique({
        where: { id },
        include: {
            pictures: {
                include: {
                    picture: true,
                },
            },
        },
    });
    if (!album)
        throw new api_errors_1.BadRequestError('Invalid id');
    return album;
}
exports.getAlbumOrThrowError = getAlbumOrThrowError;
// ****************** Get all  **********************************
const getAll = async (req, res) => {
    const result = await prisma_1.prisma.album.findMany({
        include: {
            pictures: { include: { picture: true } },
        },
    });
    /** Takes only pictures-property. */
    const albums = result.map((a) => {
        return { ...a, pictures: a.pictures.map((pic) => pic.picture) };
    });
    return res.status(200).json(albums);
};
exports.getAll = getAll;
// ****************** Get one  **********************************
const getOne = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const result = await getAlbumOrThrowError(id);
    /** Takes only pictures-property. */
    const album = {
        ...result,
        pictures: result.pictures.map((pic) => pic.picture),
    };
    return res.status(200).json(album);
};
exports.getOne = getOne;
// ****************** Get by slug  **********************************
const getBySlug = async (req, res) => {
    const slug = req.params.slug;
    const result = await prisma_1.prisma.album.findFirst({ where: { slug } });
    if (!result)
        throw new api_errors_1.BadRequestError('Invalid slug');
    const album = await getAlbumOrThrowError(result.id);
    /** Takes only pictures-property. */
    const albumWithPics = {
        ...album,
        pictures: album.pictures.map((pic) => pic.picture),
    };
    return res.status(200).json(albumWithPics);
};
exports.getBySlug = getBySlug;
// ****************** Create ************************************
const create = async (req, res) => {
    if (!req.body.title || !req.user)
        throw new Error('Missing data or authentication');
    const data = { userID: req.user.id, ...req.body };
    const created = await (0, album_model_1.createAlbum)(data);
    return res.status(201).json(created);
};
exports.create = create;
// ***************** Update *******************************
const update = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const body = req.body;
    if (!Object.keys(body).length)
        throw new Error('Nothing to update.');
    // Check if the album exists in the database
    await getAlbumOrThrowError(id);
    const updatedAlbum = await (0, album_model_1.updateAlbum)(id, body);
    return res.status(200).json(updatedAlbum);
};
exports.update = update;
// ********* Delete a specific picture by its ID **********************
const remove = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    await getAlbumOrThrowError(id);
    await (0, album_model_1.deleteAlbum)(id);
    return res.status(200).send('The album has been deleted.');
};
exports.remove = remove;
