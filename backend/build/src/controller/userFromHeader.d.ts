import { User } from '@prisma/client';
export declare function getUserFromHeader(header: string): Partial<User> | null;
