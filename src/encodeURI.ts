export function encodeURI(str: string) {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}
