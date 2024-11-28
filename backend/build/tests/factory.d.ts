import { Album, Picture, User } from '@prisma/client';
import { NewUser } from '@/model/user.model';
import { INewAlbum } from '@/model/album.model';
import { INewPicture } from '@/model/picture.model';
export declare const createNormalUser: (user?: NewUser) => Promise<User>;
export declare const userFactory: Promise<{
    createdAt: Date;
    updatedAt: Date;
    id: number;
    username: string;
    email: string;
    password: string;
}>;
export declare const albumFactory: (album?: INewAlbum) => Promise<Album>;
export declare const pictureFactory: (picture?: INewPicture) => Promise<Picture>;
