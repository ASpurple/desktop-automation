/// <reference types="node" />
/// <reference types="../index.d.ts" />
import screenshotDesktop from 'screenshot-desktop';
export declare function findSubPicture(src: FormatImage, dst: FormatImage, similarity: number): [number, number] | null;
export declare function decodeFromBuffer(buf: Buffer): FormatImage;
export declare function decodeImageFromFilePath(p: string): FormatImage;
export declare function decodeImageFromBase64(base: string): FormatImage;
export declare function findFromScreen(dst: FormatImage, similarity: number): Promise<[number, number] | null>;
export declare function findFromScreenByBase64(dst: string, similarity: number): Promise<[number, number] | null>;
export declare function getDisplays(): Promise<{
    id: number;
    name: string;
}[]>;
export declare const screenshot: typeof screenshotDesktop;
