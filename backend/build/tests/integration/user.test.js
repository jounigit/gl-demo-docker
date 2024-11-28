"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("@/model/user.model");
describe('User tests', async () => {
    it('should find all users', async () => {
        const result = await (0, user_model_1.getUsers)();
        expect(result).toBeInstanceOf(Array);
    });
    it('should find  user by email', async ({ integration }) => {
        const user = await integration.createNormalUser();
        const found = await (0, user_model_1.getUser)(user.id);
        expect(found).toBeDefined();
        expect(found.id).toEqual(user.id);
        expect(found.username).toEqual(user.username);
        expect(found.email).toEqual(user.email);
    });
    it('should update user', async ({ integration }) => {
        const user = await integration.createNormalUser();
        const newUsername = 'new_test_user';
        const updatedUser = await (0, user_model_1.updateUser)(user.id, { username: newUsername });
        expect(updatedUser.username).not.toEqual(user.username);
        expect(updatedUser.username).toEqual(newUsername);
    });
    it('should delete user', async ({ integration }) => {
        const user = await integration.createNormalUser();
        const deletedUser = await (0, user_model_1.deleteUser)(user.id);
        expect(deletedUser).toBeTruthy();
    });
});
