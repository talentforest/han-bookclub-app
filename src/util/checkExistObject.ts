export function existDocObj<T>(doc: T) {
  return !!Object.keys(doc).length;
}
