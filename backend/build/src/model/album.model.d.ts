import type { Album } from '@prisma/client';
export declare const getAlbums: () => Promise<Album[]>;
export declare const getAlbum: (id: number) => Promise<Album | null>;
export declare const getAlbumBySlug: (slug: string) => Promise<Album | null>;
export interface INewAlbum {
    title: string;
    year?: string;
    content?: string;
    userID: number;
}
export declare const createAlbum: (data: INewAlbum) => Promise<{
    title: string;
    slug: string | null;
    year: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userID: number;
}>;
export declare const updateAlbum: (id: number, data: Partial<Album>) => Promise<Album>;
export declare const deleteAlbum: (id: number) => Promise<{
    title: string;
    slug: string | null;
    year: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userID: number;
}>;
