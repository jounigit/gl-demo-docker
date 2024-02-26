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
exports.removeAlbumFromPicture = exports.createAlbumsOnPictures = void 0;
const app_1 = require("../app");
const createAlbumsOnPictures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { albumId, pictureId } = req.body;
    yield app_1.prisma.albumsOnPictures.create({
        data: {
            albumId: parseInt(String(albumId)),
            pictureId: parseInt(String(pictureId))
        },
    }).then((data) => {
        if (!data) {
            res.status(404).send({ error: 'Could not add the picture to the album.' });
        }
        else {
            res.json(data);
        }
    }).catch((e) => {
        console.log(e);
        res.status(500).send();
    });
});
exports.createAlbumsOnPictures = createAlbumsOnPictures;
const removeAlbumFromPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { albumId, pictureId } = req.body;
    try {
        const record = yield app_1.prisma.albumsOnPictures.delete({
            where: {
                albumId_pictureId: {
                    albumId: parseInt(String(albumId)),
                    pictureId: parseInt(String(pictureId))
                }
            }
        });
        if (!record) {
            return res.status(404).send('The entry was not found');
        }
        else {
            res.json({ message: 'Album picture deleted successfully' });
        }
    }
    catch (e) {
        res.status(500).send('Internal Error');
    }
});
exports.removeAlbumFromPicture = removeAlbumFromPicture;
