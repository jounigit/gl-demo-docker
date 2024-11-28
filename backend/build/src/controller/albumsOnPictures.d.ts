import type { Request, Response } from 'express';
export declare function getAll(req: Request, res: Response): Promise<void>;
export declare const createAlbumsOnPictures: (req: Request, res: Response) => Promise<void>;
export declare const removeAlbumFromPicture: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
