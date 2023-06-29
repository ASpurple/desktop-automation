declare interface FormatImage {
    width: number;
    height: number;
    data: Uint8Array;
}

declare module 'image-decode' {
    export default function decode(buf: Buffer): FormatImage
}