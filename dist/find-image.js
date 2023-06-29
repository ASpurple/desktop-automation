import decode from 'image-decode';
import screenshotDesktop from 'screenshot-desktop';
import fs from "fs";
function format(buf, rowSize) {
    rowSize *= 4;
    var result = [];
    for (var i = 0; i < buf.length; i += rowSize) {
        result.push(buf.slice(i, i + rowSize));
    }
    return result;
}
// similarity 相似度，0 ~ 1 的值，数值越大比对越精确
export function findSubPicture(src, dst, similarity) {
    var sw = src.width;
    var sh = src.height;
    var tw = dst.width;
    var th = dst.height;
    if (tw > sw || th > sh) {
        return [0, 0];
    }
    var minX = sw - tw;
    var minY = sh - th;
    var maxUnequalPixel = Math.round(tw * th * (1 - similarity));
    var tolerant = Math.round(256 * (1 - similarity));
    var srcArr = format(src.data, src.width);
    var dstArr = format(dst.data, dst.width);
    for (var x = 0; x <= minX; x++) {
        for (var y = 0; y <= minY; y++) {
            var unequal = 0;
            for (var x0 = 0; x0 < tw; x0++) {
                for (var y0 = 0; y0 < th; y0++) {
                    var c1 = srcArr[y + y0][(x + x0) * 4 + 1];
                    var c2 = dstArr[y0][x0 * 4 + 1];
                    if (Math.abs(c1 - c2) > tolerant) {
                        unequal++;
                    }
                    if (unequal > maxUnequalPixel) {
                        break;
                    }
                }
                if (unequal > maxUnequalPixel) {
                    break;
                }
            }
            if (unequal <= maxUnequalPixel) {
                x = x + tw / 2;
                y = y + th / 2;
                return [x, y];
            }
        }
    }
    return null;
}
export function decodeFromBuffer(buf) {
    return decode(buf);
}
export function decodeImageFromFilePath(p) {
    return decode(fs.readFileSync(p));
}
export function decodeImageFromBase64(base) {
    var buf = Buffer.from(base, "base64");
    return decode(buf);
}
// similarity 相似度，0 ~ 1 的值，数值越大比对越精确
export function findFromScreen(dst, similarity) {
    return new Promise(function (resolve) {
        screenshotDesktop.listDisplays().then(function (displays) {
            screenshotDesktop({ screen: displays[0].id, format: "png" })
                .then(function (img) {
                var screen = decode(img);
                resolve(findSubPicture(screen, dst, similarity));
            });
        });
    });
}
// similarity 相似度，0 ~ 1 的值，数值越大比对越精确
export function findFromScreenByBase64(dst, similarity) {
    return findFromScreen(decodeImageFromBase64(dst), similarity);
}
export function getDisplays() {
    return screenshotDesktop.listDisplays();
}
export var screenshot = screenshotDesktop;
