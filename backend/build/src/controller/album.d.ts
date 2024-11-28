import type { Request, Response } from 'express';
export declare function getAlbumOrThrowError(id: number): Promise<{
    pictures: ({
        picture: {
            title: string;
            year: string | null;
            content: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userID: number;
            image: string;
        };
    } & {
        albumId: number;
        pictureId: number;
    })[];
} & {
    title: string;
    slug: string;
    year: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userID: number;
}>;
export declare const getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getOne: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getBySlug: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const remove: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
