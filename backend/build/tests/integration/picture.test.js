"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const picture_model_1 = require("@/model/picture.model");
describe('Picture tests', () => {
    it('should find all users', async () => {
        const result = await (0, picture_model_1.getPictures)();
        expect(result).toBeInstanceOf(Array);
    });
    it('should create picture', async ({ integration }) => {
        const user = await integration.createNormalUser();
        const res = await (0, picture_model_1.createPicture)({
            title: 'test Pic',
            content: 'this is a test pic',
            image: 'https://picsum.photos/200/300',
            userID: user.id,
        });
        expect(res).toHaveProperty('title', 'test Pic');
    });
    it('should update picture', async ({ integration }) => {
        const picture = await integration.pictureFactory();
        const newPicture = {
            title: 'new Title',
            image: '',
            userID: picture.userID
        };
        const updatedPicture = await (0, picture_model_1.updatePicture)(picture.id, newPicture);
        expect(updatedPicture.title).toEqual('new Title');
    });
    it('should delete an picture', async ({ integration }) => {
        const picture = await integration.pictureFactory();
        const deleted = await (0, picture_model_1.deletePicture)(picture.id);
        expect(deleted).toBeTruthy();
    });
});
