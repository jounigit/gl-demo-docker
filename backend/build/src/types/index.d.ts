export declare function isNotNull<TValueType>(value: TValueType | null): value is TValueType;
export declare function hasOwnProperty<X extends object, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown>;
