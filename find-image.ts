import decode from 'image-decode';
import screenshotDesktop from 'screenshot-desktop';
import fs from "fs";

function format(buf: Uint8Array, rowSize: number) {
	rowSize *= 4;
	const result: Uint8Array[] = [];
	for (let i = 0; i < buf.length; i += rowSize) {
		result.push(buf.slice(i, i + rowSize));
	}
	return result;
}

// similarity 相似度，0 ~ 1 的值，数值越大比对越精确
export function findSubPicture(src: FormatImage, dst: FormatImage, similarity: number): [number, number] | null {
	const sw = src.width;
	const sh = src.height;
	const tw = dst.width;
	const th = dst.height;
	if (tw > sw || th > sh) {
		return [0, 0];
	}
	const minX = sw - tw;
	const minY = sh - th;
	const maxUnequalPixel = Math.round(tw * th * (1 - similarity));
	const tolerant = Math.round(256 * (1 - similarity));
	const srcArr = format(src.data, src.width);
	const dstArr = format(dst.data, dst.width);
	for (let x = 0; x <= minX; x++) {
		for (let y = 0; y <= minY; y++) {
			let unequal = 0;
			for (let x0 = 0; x0 < tw; x0++) {
				for (let y0 = 0; y0 < th; y0++) {
					const c1 = srcArr[y + y0][(x + x0) * 4 + 1];
					const c2 = dstArr[y0][x0 * 4 + 1];
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

export function decodeFromBuffer(buf: Buffer) {
	return decode(buf);
}

export function decodeImageFromFilePath(p: string): FormatImage {
    return decode(fs.readFileSync(p));
}

export function decodeImageFromBase64(base: string): FormatImage {
    const buf = Buffer.from(base, "base64");
    return decode(buf);
}

// similarity 相似度，0 ~ 1 的值，数值越大比对越精确
export function findFromScreen(dst: FormatImage, similarity: number): Promise<[number, number] | null> {
    return new Promise((resolve) => {
        screenshotDesktop.listDisplays().then((displays) => {
            screenshotDesktop({ screen: displays[0].id, format: "png" })
              .then((img) => {
                const screen = decode(img);
                resolve(findSubPicture(screen, dst, similarity));
              });
          });
    });
}

// similarity 相似度，0 ~ 1 的值，数值越大比对越精确
export function findFromScreenByBase64(dst: string, similarity: number): Promise<[number, number] | null> {
	return findFromScreen(decodeImageFromBase64(dst), similarity);
}

export function getDisplays() {
	return screenshotDesktop.listDisplays();
}

export const screenshot = screenshotDesktop;
