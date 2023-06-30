// robotjs API 文档：https://robotjs.io/docs/syntax
import robot from "robotjs";
import { find } from "./find-image.js";
export * from "./find-image.js";
export function setKeyboardDelay(ms) {
    robot.setKeyboardDelay(ms);
}
export function keyTap(key, modifier) {
    robot.keyTap(key, modifier);
}
export function keyToggle(key, down, modifier) {
    return robot.keyToggle(key, down, modifier);
}
export function typeString(str) {
    return robot.typeString(str);
}
export function typeStringDelayed(str, cpm) {
    return robot.typeStringDelayed(str, cpm);
}
export function setMouseDelay(delay) {
    return robot.setMouseDelay(delay);
}
export function updateScreenMetrics() {
    return robot.updateScreenMetrics();
}
export function moveMouse(x, y) {
    return robot.moveMouse(x, y);
}
export function moveMouseSmooth(x, y, speed) {
    return robot.moveMouseSmooth(x, y, speed);
}
export function mouseClick(button, double) {
    return robot.mouseClick(button, double);
}
export function mouseToggle(down, button) {
    return robot.mouseToggle(down, button);
}
export function dragMouse(x, y) {
    return robot.dragMouse(x, y);
}
export function scrollMouse(x, y) {
    return robot.scrollMouse(x, y);
}
export function getMousePos() {
    return robot.getMousePos();
}
export function getPixelColor(x, y) {
    return robot.getPixelColor(x, y);
}
export function getScreenSize() {
    return robot.getScreenSize();
}
// only for windows
export function openDesktop() {
    keyTap("d", "command");
}
export function findAndClick(dst, button, double) {
    if (button === void 0) { button = "left"; }
    if (double === void 0) { double = false; }
    return new Promise(function (resolve) {
        find(dst).then(function (pos) {
            if (!pos)
                return;
            moveMouse(pos[0], pos[1]);
            mouseClick(button, double);
            resolve(null);
        });
    });
}
