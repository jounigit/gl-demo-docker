import type { Album, Picture } from '@prisma/client';
export declare const getPictures: () => Promise<Picture[]>;
export declare function getPictureOrThrowError(id: number): Promise<{
    title: string;
    year: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userID: number;
    image: string;
}>;
export interface INewPicture {
    title: string;
    year?: string;
    content?: string;
    image: string;
    userID: number;
}
export declare const createPicture: (data: INewPicture) => Promise<Picture>;
export declare const updatePicture: (id: number, data: Partial<Album>) => Promise<{
    title: string;
    year: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userID: number;
    image: string;
}>;
export declare const deletePicture: (id: number) => Promise<{
    title: string;
    year: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userID: number;
    image: string;
}>;
