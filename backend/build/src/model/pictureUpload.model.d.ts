import type { Picture, User } from '@prisma/client';
export declare function pictureUploadModel(file: Express.Multer.File, user: Partial<User>): Promise<Picture>;
