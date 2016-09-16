declare module 'urlencode' {
  export default function encode(html: string, allowedTags?: string | string[]): string;
  export function encode(str: string, charset: string): string;
  export function decode(str: string, charset: string): string;
  export function parse(qs: string | string[], sep?: string, eq?: string, options?: Object): Object;
  export function stringify(obj: Object, prefix?: string, options?: Object): string;
}
