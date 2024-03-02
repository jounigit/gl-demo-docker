export function isNotNull
<TValueType>(value: TValueType | null): value is TValueType {
  return value !== null
}
