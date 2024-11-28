"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pictureFactory = exports.albumFactory = exports.userFactory = exports.createNormalUser = void 0;
const faker_1 = require("@faker-js/faker");
const user_model_1 = require("@/model/user.model");
const album_model_1 = require("@/model/album.model");
const picture_model_1 = require("@/model/picture.model");
// creates normal users for us
const createNormalUser = (user) => {
    return (0, user_model_1.createUser)({
        username: faker_1.faker.internet.userName(),
        email: faker_1.faker.internet.email().toLowerCase(),
        password: faker_1.faker.internet.password(),
        ...user,
    });
};
exports.createNormalUser = createNormalUser;
exports.userFactory = (0, exports.createNormalUser)({
    username: faker_1.faker.internet.userName(),
    email: faker_1.faker.internet.email(),
    password: faker_1.faker.internet.password(),
});
const albumFactory = async (album) => {
    return (0, album_model_1.createAlbum)({
        title: faker_1.faker.lorem.sentence(1),
        content: faker_1.faker.lorem.paragraphs(2),
        userID: (await exports.userFactory).id,
        ...album,
    });
};
exports.albumFactory = albumFactory;
const pictureFactory = async (picture) => {
    return (0, picture_model_1.createPicture)({
        title: faker_1.faker.lorem.sentence(1),
        image: 'https://picsum.photos/600',
        userID: (await exports.userFactory).id,
        ...picture,
    });
};
exports.pictureFactory = pictureFactory;
// creates admin users for us
// export const createAdminUser = (user?: Omit<User, 'id'>) => {
//   return createUser({
//     email: faker.internet.email().toLowerCase(),
//     ...user,
//   })
// }
