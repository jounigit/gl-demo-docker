"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const prisma_1 = require("../services/prisma");
const getUsers = async () => await prisma_1.prisma.user.findMany();
exports.getUsers = getUsers;
const getUser = async (id) => {
    if (!id)
        return null;
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
        include: {
            albums: true,
            pictures: true,
        } // Include the related
    });
    if (!user)
        throw new Error(`No user found with id ${id}`);
    return user;
};
exports.getUser = getUser;
// Create  a new user
const createUser = async (data) => {
    const user = await prisma_1.prisma.user.create({ data });
    if (!user)
        throw new Error('Failed to create user');
    return user;
};
exports.createUser = createUser;
const updateUser = async (id, data) => {
    const user = await (0, exports.getUser)(id);
    if (!user)
        throw new Error(`Could not find user with id ${id}`);
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id },
        data,
    });
    return updatedUser;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const user = await (0, exports.getUser)(id);
    if (!user)
        throw new Error(`Could not find user with id ${id}`);
    const deletedUser = await prisma_1.prisma.user.delete({ where: { id } });
    return deletedUser;
};
exports.deleteUser = deleteUser;
