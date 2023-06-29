/// <reference types="node" />
export * from "./find-image.js";
export declare function setKeyboardDelay(ms: number): void;
export declare function keyTap(key: string, modifier?: string | string[]): void;
export declare function keyToggle(key: string, down: string, modifier?: string | string[]): void;
export declare function typeString(str: string): void;
export declare function typeStringDelayed(str: string, cpm: number): void;
export declare function setMouseDelay(delay: number): void;
export declare function updateScreenMetrics(): void;
export declare function moveMouse(x: number, y: number): void;
export declare function moveMouseSmooth(x: number, y: number, speed?: number): void;
export declare function mouseClick(button?: string, double?: boolean): void;
export declare function mouseToggle(down?: string, button?: string): void;
export declare function dragMouse(x: number, y: number): void;
export declare function scrollMouse(x: number, y: number): void;
export declare function getMousePos(): {
    x: number;
    y: number;
};
export declare function getPixelColor(x: number, y: number): string;
export declare function getScreenSize(): {
    width: number;
    height: number;
};
export declare function openDesktop(): void;
export declare function findAndClick(dst: Buffer | string, button?: "left" | "right", double?: boolean): Promise<unknown>;
