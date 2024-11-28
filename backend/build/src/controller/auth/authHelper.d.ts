import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
export declare function generateAccessToken(user: Partial<User>): string;
export declare function verifyAccessToken(token: string): {
    success: boolean;
    data: string | jwt.JwtPayload;
    error?: undefined;
} | {
    success: boolean;
    error: string;
    data?: undefined;
};
