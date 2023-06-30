/// <reference types="node" />
/// <reference types="../index.d.ts" />
import screenshotDesktop from "screenshot-desktop";
export declare const screenshot: typeof screenshotDesktop;
export declare function getDisplays(): Promise<{
    id: number;
    name: string;
}[]>;
export declare function findSubPicture(src: FormatImage, dst: FormatImage, similarity: number): [number, number] | null;
export declare function decodeFromBuffer(buf: Buffer): FormatImage;
export declare function decodeImageFromFilePath(p: string): FormatImage;
export declare function decodeImageFromBase64(base: string): FormatImage;
export declare function findFromScreen(dst: FormatImage, similarity?: number): Promise<[number, number] | null>;
export declare function find(dst: Buffer | string, ops?: {
    similarity: number;
    retry: number;
    retryInterval: number;
}): Promise<[number, number] | null>;
