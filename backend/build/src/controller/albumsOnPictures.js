"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAlbumFromPicture = exports.createAlbumsOnPictures = exports.getAll = void 0;
const prisma_1 = require("../services/prisma");
// ***************** Get all *********************************
async function getAll(req, res) {
    try {
        const albumPics = await prisma_1.prisma.albumsOnPictures.findMany();
        res.json(albumPics);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching album pictures' });
    }
}
exports.getAll = getAll;
// ****************** Create ************************************
const createAlbumsOnPictures = async (req, res) => {
    const { albumId, pictureId } = req.body;
    await prisma_1.prisma.albumsOnPictures.create({
        data: {
            albumId: Number.parseInt(String(albumId)),
            pictureId: Number.parseInt(String(pictureId))
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
};
exports.createAlbumsOnPictures = createAlbumsOnPictures;
// ********* Delete  **********************
const removeAlbumFromPicture = async (req, res) => {
    const { albumId, pictureId } = req.body;
    try {
        const record = await prisma_1.prisma.albumsOnPictures.delete({
            where: {
                albumId_pictureId: {
                    albumId: Number.parseInt(String(albumId)),
                    pictureId: Number.parseInt(String(pictureId))
                }
            }
        });
        if (!record) {
            return res.status(404).send('The entry was not found');
            // biome-ignore lint/style/noUselessElse: <explanation>
        }
        else {
            res.json({ message: 'Album picture deleted successfully' });
        }
    }
    catch (e) {
        res.status(500).send('Internal Error');
    }
};
exports.removeAlbumFromPicture = removeAlbumFromPicture;
