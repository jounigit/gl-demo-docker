"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const album_model_1 = require("@/model/album.model");
describe('Album tests', () => {
    it('should find all users', async () => {
        const result = await (0, album_model_1.getAlbums)();
        expect(result).toBeInstanceOf(Array);
    });
    it('should find  album by id', async ({ integration }) => {
        const album = await integration.albumFactory();
        const found = await (0, album_model_1.getAlbum)(album.id);
        expect(found).toBeDefined();
        expect(found.id).toEqual(album.id);
        expect(found.title).toEqual(album.title);
    });
    it('should create album', async ({ integration }) => {
        const user = await integration.createNormalUser();
        const res = await (0, album_model_1.createAlbum)({
            title: 'test album',
            content: 'this is a test album',
            userID: user.id,
        });
        expect(res).toHaveProperty('title', 'test album');
    });
    it('should update album', async ({ integration }) => {
        const album = await integration.albumFactory();
        const updatedTitle = `updated ${album.title}`;
        const updatedContent = `updated ${album.content}`;
        const newAlbum = {
            title: updatedTitle,
            content: updatedContent,
            userID: album.userID,
        };
        const updated = await (0, album_model_1.updateAlbum)(album.id, newAlbum);
        expect(updated.title).toEqual(updatedTitle);
        expect(updated.content).toEqual(updatedContent);
    });
    it('should delete an album', async ({ integration }) => {
        const album = await integration.albumFactory();
        const deleted = await (0, album_model_1.deleteAlbum)(album.id);
        expect(deleted).toBeTruthy();
    });
});
