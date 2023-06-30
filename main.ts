// robotjs API 文档：https://robotjs.io/docs/syntax

import robot from "robotjs";
import { find } from "./find-image.js";
export * from "./find-image.js";

export function setKeyboardDelay(ms: number) {
	robot.setKeyboardDelay(ms);
}

export function keyTap(key: string, modifier?: string | string[]) {
	robot.keyTap(key, modifier);
}

export function keyToggle(key: string, down: string, modifier?: string | string[]) {
	return robot.keyToggle(key, down, modifier);
}
export function typeString(str: string) {
	return robot.typeString(str);
}
export function typeStringDelayed(str: string, cpm: number) {
	return robot.typeStringDelayed(str, cpm);
}
export function setMouseDelay(delay: number) {
	return robot.setMouseDelay(delay);
}
export function updateScreenMetrics() {
	return robot.updateScreenMetrics();
}
export function moveMouse(x: number, y: number) {
	return robot.moveMouse(x, y);
}
export function moveMouseSmooth(x: number, y: number, speed?: number) {
	return robot.moveMouseSmooth(x, y, speed);
}
export function mouseClick(button?: string, double?: boolean) {
	return robot.mouseClick(button, double);
}
export function mouseToggle(down?: string, button?: string) {
	return robot.mouseToggle(down, button);
}
export function dragMouse(x: number, y: number) {
	return robot.dragMouse(x, y);
}
export function scrollMouse(x: number, y: number) {
	return robot.scrollMouse(x, y);
}
export function getMousePos() {
	return robot.getMousePos();
}
export function getPixelColor(x: number, y: number) {
	return robot.getPixelColor(x, y);
}
export function getScreenSize() {
	return robot.getScreenSize();
}

// only for windows
export function openDesktop() {
	keyTap("d", "command");
}

export function findAndClick(dst: Buffer | string, button: "left" | "right" = "left", double = false, smooth = true) {
	return new Promise((resolve) => {
		find(dst).then((pos) => {
			if (!pos) {
				resolve(pos);
				return;
			}
			if (smooth) {
				moveMouseSmooth(pos[0], pos[1]);
			} else {
				moveMouse(pos[0], pos[1]);
			}
			mouseClick(button, double);
			resolve(pos);
		});
	});
}
