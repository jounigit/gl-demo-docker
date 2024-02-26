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
exports.deleteAlbum = exports.updateAlbum = exports.createAlbum = exports.getOne = exports.getAll = void 0;
const app_1 = require("../app");
// Get  all albums
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const albums = yield app_1.prisma.album.findMany({
        include: {
            pictures: { include: { picture: true } }
        }
    });
    return res.status(200).json(albums);
});
exports.getAll = getAll;
// Get album
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const album = yield app_1.prisma.album.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                pictures: { include: { picture: true } }
            }
        });
        if (!album)
            return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(album);
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
exports.getOne = getOne;
// Create an album
const createAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title) {
        return res.status(400).json({ error: 'Missing data' });
    }
    const { title, year, content, userID } = req.body;
    try {
        const newAlbum = yield app_1.prisma.album.create({
            data: {
                title,
                slug: title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'),
                year,
                content,
                userID: parseInt(userID)
                // userID: { connect: { id: userID } }
            },
        });
        return res.status(201).json(newAlbum);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'error': e });
    }
});
exports.createAlbum = createAlbum;
// Update an album
const updateAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, year, content } = req.body;
    // Check if the album exists in the database
    const album = yield app_1.prisma.album.findUnique({ where: { id } });
    if (!album)
        return res.status(404).send('The album was not found.');
    // If fields are provided, update them in the database
    if (Object.keys(req.body).length > 0) {
        try {
            const updatedAlbum = yield app_1.prisma.album.update({
                where: { id },
                data: {
                    title: title ? title : album.title,
                    slug: title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'),
                    year: isNaN(year) ? album.year : year,
                    content: content ? content : album.content,
                }
            });
            return res.status(200).json(updatedAlbum);
        }
        catch (e) {
            return res.status(400).json({ 'error': e });
        }
    }
});
exports.updateAlbum = updateAlbum;
// Delete an album
const deleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const album = yield app_1.prisma.album.delete({
        where: { id }
    });
    if (!album)
        return res.status(404).send('The album with the given ID was not found.');
    return res.status(200).send('The album has been deleted.');
});
exports.deleteAlbum = deleteAlbum;
// const album = await prisma.album.findUnique({
//   where: { id: parseInt(req.params.id) },
//   select: {
//     id: true,
//     title: true,
//     content: true,
//     user: { select: { name:true } },
//     pictures: true
//   }
// })
