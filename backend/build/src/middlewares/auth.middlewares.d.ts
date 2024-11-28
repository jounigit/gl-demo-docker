import { NextFunction, Request, Response } from 'express';
export declare const verifyToken: (req: Request, _: Response, next: NextFunction) => Promise<void>;
