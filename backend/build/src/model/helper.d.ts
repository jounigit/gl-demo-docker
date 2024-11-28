/// <reference types="node" />
import type { Response } from 'express';
export declare function ensureDir(path: string): Promise<void>;
export declare function imageValidations(ext: string, fileSize: number, res: Response): Response<any, Record<string, any>> | undefined;
export declare function makeSourcePath(dir: string, newName: string): string;
export declare function deleteFileIfExists(filePath: string): void;
export declare function resizeImage(buf: Buffer, srcUrl: string, size: number, destUrl: string): Promise<void>;
export declare function checkFileExists(file: string): boolean;
export declare function isAllFiles(files: string[]): boolean;
export declare function checkFilesExistence(files: string[]): string[];
