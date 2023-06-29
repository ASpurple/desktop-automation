## 说明

桌面图形识别 + 自动化操作

## 使用方式

### 1. 安装

```sh
npm install desktop-automation --save
```

### 2. 使用

```ts
import { decodeImageFromFilePath, findFromScreen, moveMouse, mouseClick } from 'desktop-automation';

findFromScreen(decodeImageFromFilePath("./qq.png"), 0.95).then(position => {
	if (!position) return;
	moveMouse(position[0], position[1]);
	mouseClick();
});
```