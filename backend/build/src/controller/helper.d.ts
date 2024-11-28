/// <reference types="node" />
import { Response } from 'express';
export declare function imageValidations(ext: string, fileSize: number, res: Response): Response<any, Record<string, any>> | undefined;
export declare function makeSourcePath(dir: string, newName: string): string;
export declare const deleteFileIfExists: (filePath: string) => void;
export declare function resizeImage(buf: Buffer, srcUrl: string, size: number, destUrl: string): Promise<void>;
