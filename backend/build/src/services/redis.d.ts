export declare function getFromCache(key: string): Promise<string | null>;
export declare function setToCache(key: string, value: string): Promise<void | string | null>;
export declare function removeFromCache(key: string): Promise<number>;
