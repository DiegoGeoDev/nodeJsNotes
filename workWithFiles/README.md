### Trabalhando com Arquivos no Node.js

#### 1 - LER

```javascript
async function readFile(filePath, parseJSON = false) {
	try {
		const buffer = await fs.readFile(filePath);
		const data = parseJSON ? JSON.parse(buffer) : buffer.toString();
		console.log('DATA', data);
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}
```

#### 2 - ESCREVER

```javascript
async function writeFile(filePath, content, flag, stringfyJSON = false) {
	try {
		const data = stringfyJSON ? JSON.stringify(content, null, 2) : content;
		await fs.writeFile(filePath, data, { flag: flag });
		console.log('WRITED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}
```

#### 3 - DELETAR

```javascript
async function deleteFile(filePath) {
	try {
		await fs.unlink(filePath);
		console.log('DELETED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}
```

#### 4 - MOVER

```javascript
async function moveFile(currentPath, destinationPath) {
	try {
		await fs.rename(currentPath, destinationPath);
		console.log('MOVED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}
```

#### 5 - LINKS

[MÓDULO FILE SYSTEM](https://nodejs.org/api/fs.html)
