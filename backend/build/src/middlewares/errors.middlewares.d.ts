import { Request, Response } from 'express';
import { ApiError } from '../helpers/api-errors';
export declare const errors: (error: Error & Partial<ApiError>, _: Request, res: Response) => Response<any, Record<string, any>>;
