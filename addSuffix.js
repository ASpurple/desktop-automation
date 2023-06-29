import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outdir = path.resolve(__dirname, "./dist");

function getImportStatements(content) {
	const results = [];
	const arr = content.split(/\r?\n/);
	for (let i = 0; i < arr.length; i++) {
		const statement = arr[i].trim();
		if (!statement) continue;
		if (!statement.startsWith("import")) break;
		results.push(statement);
	}
	return results;
}

function resolveImportStatement(filePath, importStatement) {
	let s = importStatement.indexOf("\"");
	let e = importStatement.lastIndexOf("\"");
	if (s < 0) {
		s = importStatement.indexOf("'");
		e = importStatement.lastIndexOf("'");
	}
	const from = importStatement.slice(s + 1, e);
	if (from.startsWith(".") || from.startsWith("/")) {
		const dir = path.dirname(filePath);
		const abs = path.resolve(dir, from);
		const possiblePaths = [abs, abs + ".js", path.join(abs, "index.js")];
		let newPath = "";
		for (let i = 0; i < possiblePaths.length; i++) {
			const p = possiblePaths[i];
			try {
				const stat = fs.statSync(p);
				if (stat.isDirectory()) continue;
				newPath = path.relative(dir, p).replaceAll("\\", "/");
				if (!newPath.startsWith(".")) newPath = "./" + newPath;
				break;
			} catch(e) {
				continue;
			}
		}
		if (!newPath) {
			console.error(`匹配不到有效路径：${importStatement}`);
			return importStatement;
		}
		return importStatement.replace(from, newPath);
	}
	return importStatement;
}

function AutomaticallyCompleteSuffix(filePath) {
	let content = fs.readFileSync(filePath, "utf-8");
	const importStatements = getImportStatements(content);
	importStatements.forEach(s => {
		const newImport = resolveImportStatement(filePath, s);
		content = content.replace(s, newImport);
	});
	fs.writeFileSync(filePath, content, "utf-8");
}

function traverseFolder(folderPath) {
	const paths = fs.readdirSync(folderPath);
	paths.forEach((p) => {
		p = path.join(folderPath, p);
		const stat = fs.statSync(p);
		if (stat.isDirectory()) {
			traverseFolder(p);
		} else {
			AutomaticallyCompleteSuffix(p);
		}
	});
}

console.log(`开始自动补全 import 路径...`);

try {
	traverseFolder(outdir);
	console.log("自动补全成功");
} catch (e) {
	console.error("操作失败：");
	console.error(e);
}
