import { User } from '@prisma/client';
export declare const getUsers: () => Promise<User[]>;
export declare const getUser: (id: number) => Promise<User | null>;
export interface NewUser {
    username: string;
    email: string;
    password: string;
}
export declare const createUser: (data: NewUser) => Promise<User>;
export declare const updateUser: (id: number, data: Partial<User>) => Promise<User>;
export declare const deleteUser: (id: number) => Promise<User>;
