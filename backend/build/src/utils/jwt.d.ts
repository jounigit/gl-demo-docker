import { User } from '@prisma/client';
declare function generateAccessToken(user: Partial<User>): string;
declare function generateRefreshToken(user: Partial<User>, jti: string): string;
declare function generateTokens(user: Partial<User>, jti: string): {
    accessToken: string;
    refreshToken: string;
};
declare const _default: {
    generateAccessToken: typeof generateAccessToken;
    generateRefreshToken: typeof generateRefreshToken;
    generateTokens: typeof generateTokens;
};
export default _default;
