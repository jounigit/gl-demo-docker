"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAlbum = exports.updateAlbum = exports.createAlbum = exports.getAlbumBySlug = exports.getAlbum = exports.getAlbums = void 0;
const prisma_1 = require("../services/prisma");
const getAlbums = async () => await prisma_1.prisma.album.findMany();
exports.getAlbums = getAlbums;
const getAlbum = async (id) => {
    if (!id)
        return null;
    return await prisma_1.prisma.album.findUnique({ where: { id } });
};
exports.getAlbum = getAlbum;
const getAlbumBySlug = async (slug) => {
    // if (!slug) return null
    console.log('SLUG album model: ', slug);
    return await prisma_1.prisma.album.findFirst({ where: { slug } });
};
exports.getAlbumBySlug = getAlbumBySlug;
const createAlbum = async (data) => {
    const album = await prisma_1.prisma.album.create({ data });
    if (!album) {
        throw new Error('Could not create the album');
    }
    return album;
};
exports.createAlbum = createAlbum;
const updateAlbum = async (id, data) => {
    const res = await prisma_1.prisma.album.update({
        where: { id },
        data
    });
    if (!res) {
        throw new Error('couldn\'t update album');
    }
    return res;
};
exports.updateAlbum = updateAlbum;
const deleteAlbum = async (id) => {
    const isDeleted = await prisma_1.prisma.album.delete({ where: { id } });
    if (!isDeleted) {
        throw new Error('Failed to delete album');
    }
    return isDeleted;
};
exports.deleteAlbum = deleteAlbum;
