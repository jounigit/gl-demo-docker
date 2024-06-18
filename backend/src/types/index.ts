/* eslint-disable no-prototype-builtins */
export function isNotNull
<TValueType>(value: TValueType | null): value is TValueType {
  return value !== null
}

export function
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
hasOwnProperty<X extends object, Y extends PropertyKey>(obj: X, prop: Y)
: obj is X & Record<Y, unknown> {
  // eslint-disable-next-line no-prototype-builtins
  // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
  return obj.hasOwnProperty(prop)
}