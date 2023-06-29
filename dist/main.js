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
            console.log(pos);
            if (!pos)
                return;
            moveMouse(pos[0], pos[1]);
            mouseClick(button, double);
            resolve(null);
        });
    });
}
var DDD = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAqCAYAAAD1T9h6AAAE2ElEQVRYhe1ZX0hbVxj/ZX8fxAcRzDoQpi2bgzWDNoOheVFnfSihpOxlzjlwDEcG6mYUujEz3dqHNJZ0DwH7kIeYZS+j3Vb6YG3Xl3jraDpo9rDsQTMQ2iVF+qBS6BjufCemyb333Jtz43V24A9C7j059zvf73y/7/vOVcfdh1tbqBGbmxtYuqlgSVnEysoyCvm/+Phh1+tobT2Erp5j7PtgreYNcWQWuDdSvHbUSiCZiOOnHy5yEnV1dWhhjrYePIQ8I1HI55FjhAhEZvTTcTQ5X9gVAs9YfZgcjsycZTu/iNcOu9DX/z53UguKxrWFq/ju2ziGP/4IZ0IzuxINyxH4enoSvzDZvPPuAHN+oOp8ktbpqUlGfNM2EpUReMrKgySbas7f+FN9Tw5/HpxmV1s4PR2swV1zSBMg6ZDmi7IRO393Hfjyhn6cSHw45Oeyok2wE9IEqNIQCdK8EYLM+fVH4t+6e3p5ol+/dtWyk2aQJnCTJS1VG1HCEmbTwO175ja6WVmlKKxsVyg7IE0gt7zMd1CEP9YYgdvVbVBvIGxubMguWxXSBAqFPK/zWpBkxubVY1Ql6KNN6BJ+y9yx4qMpLFWh/HanrUR4sZi8WnhfBjpfEttxOp1WljWFNAGqPvdZh9ViqhP4dQi44C2PHagHAh16G1QECHZ2ZWkCJJ/K844ZzvUC9c/px6mSEYwKQS2QJkBlkEDHAzMMHQVeadSPE3Eqod1vHbPmYRXIR4BVIJIRnW2MyuDRA4yAW/z8hdko/5Y5fliBpST+ZGyC9wI6EmhJ1D9fzAcRIjOhx0cQO/VPsESAFj8TOsfq+Do+mxhTdVWSzYv16vkkGyJbko7du0+o6X2gdMLkvYFJi/KDknyLmXI4HLxRUee+vlBsELInV1nY8kJDoIMZOUlERCjtut2ysY1ACRQR2nXqsNSkyGE7S6UWO3ojE6H0krKbThvBUhI/idgnsNfYJ7DX2Cew19ARyEZHsFBQjz24MgJvNFPVWDbqRqz6tDIKP2JKwq4Z1J04E4HXn1DP6OuHL5nAJdVgP86muqB4BjXjAvTFcNnvEv9GBE5+hbTuB7I/ijYDkwadOIOYP4fhizGshnLwhU+gAWtYCPRiNZpGfHUEl5rPY9BVnq9oFqIIKJ50eQ45+P0OCErgMYFsdBBgjvY0sZuJHA9t8O0clNYYgmTfNYnmQATZsPHOVAfbJEHUvMnKO/PdNyTQ5p/HasAN75LesGoBTwK+aGmXExj3aCSXdKsdZDushpmDFPE5Sdc1BIBG9IRZBCp/5RJoQdAwxDZIaIeokJAb40nxJK9uvIPlygc1LimImgpsUyxYk34foFKqTWKRnnXYYZKKIK5CohKqw7a+3/wC8XALqkqIg3QdQTMlP0kqBAyHPUgHplmxOM+KBm3Ez2jndth1oFQB5VBuZK5RXE6l2ScGHx8gmaS3x1gZPdXBk5ff8wVcGJSpFoUUK7ctcBKREHN0gp5thLsTUG6t0cJo70tA4f2M2RzI4Zsra5LuC9/IyDG2i3RJUTlZjoovam6szdOPcb9bJyv3qXk0ZOagdE4i2FQca3ijCwil8OD4ieJzqQyLHAud6z20x+eQPS5XSm15J/6vUfP/yJ4E/P0P8OzT5fv/HYHf7wOvVvzt9V8/rhtW4ugegQAAAABJRU5ErkJggg==";
findAndClick(DDD);
console.log(getMousePos());
