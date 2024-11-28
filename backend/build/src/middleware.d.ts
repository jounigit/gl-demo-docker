import type { NextFunction, Request, Response } from 'express';
export declare function notFound(req: Request, res: Response, next: NextFunction): void;
export declare function errorHandler(err: Error, _: Request, res: Response): void;
export declare function isAuthenticated(_err: Error, req: Request, res: Response, next: NextFunction): void;
