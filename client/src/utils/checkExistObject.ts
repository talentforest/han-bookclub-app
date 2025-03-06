export function existDocObj<T>(doc: T) {
  return doc ? !!Object.keys(doc).length : {};
}
