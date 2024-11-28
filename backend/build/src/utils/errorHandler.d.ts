export interface Error {
    status?: number;
    message?: string;
}
export declare const errorHandler: (err: Error) => never;
