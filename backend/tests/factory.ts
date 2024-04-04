import { Album, Picture, User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { NewUser, createUser } from '@/model/user.model'
import { createAlbum, INewAlbum } from '@/model/album.model'
import { INewPicture, createPicture } from '@/model/picture.model'

// creates normal users for us
export const createNormalUser = (user?: NewUser): Promise<User> => {
  return createUser({
    username: faker.internet.userName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    ...user,
  })
}

export const userFactory = createNormalUser({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const albumFactory = async (album? :INewAlbum): Promise<Album> => {
  return  createAlbum({
    title: faker.lorem.sentence(1),
    content: faker.lorem.paragraphs(2),
    userID: (await userFactory).id,
    ...album,
  })
}

export const pictureFactory = async (picture?: INewPicture): Promise<Picture> => {
  return createPicture({
    title: faker.lorem.sentence(1),
    image: 'https://picsum.photos/600',
    userID: (await userFactory).id,
    ...picture,
  })
}

// creates admin users for us
// export const createAdminUser = (user?: Omit<User, 'id'>) => {
//   return createUser({
//     email: faker.internet.email().toLowerCase(),
//     ...user,
//   })
// }