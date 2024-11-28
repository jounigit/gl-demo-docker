"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePicture = exports.updatePicture = exports.createPicture = exports.getPictureOrThrowError = exports.getPictures = void 0;
const prisma_1 = require("../services/prisma");
const getPictures = async () => await prisma_1.prisma.picture.findMany();
exports.getPictures = getPictures;
async function getPictureOrThrowError(id) {
    const picture = await prisma_1.prisma.picture.findUnique({ where: { id } });
    if (!picture)
        throw new Error(`No picture found with id ${id}`);
    return picture;
}
exports.getPictureOrThrowError = getPictureOrThrowError;
const createPicture = async (data) => {
    const picture = await prisma_1.prisma.picture.create({ data });
    if (!picture) {
        throw new Error('Could not create the picture');
    }
    return picture;
};
exports.createPicture = createPicture;
const updatePicture = async (id, data) => {
    await getPictureOrThrowError(id);
    const updatedPicture = await prisma_1.prisma.picture.update({
        where: { id },
        data,
    });
    if (!updatedPicture)
        throw new Error(`Failed to update picture with ID "${id}"`);
    return updatedPicture;
};
exports.updatePicture = updatePicture;
const deletePicture = async (id) => {
    await getPictureOrThrowError(id);
    const res = await prisma_1.prisma.picture.delete({ where: { id } });
    if (!res)
        throw new Error(`Failed to delete picture with ID "${id}"`);
    return res;
};
exports.deletePicture = deletePicture;
