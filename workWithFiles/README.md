### Trabalhando com Arquivos no Node.js

Com o Node.js podemos manipular arquivos com o Módulo `fs - File System` e com o Módulo `path - Path` podemos
trabalhar com diretórios.

**Pré-requisitos**

- Ter o Node.js instalado no computador.
  [Node.js](https://nodejs.org/en/)
- Estar familiarizado com JavaScript Promises.
  [JavaScript Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  [Async Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

#### 1 - LER

O `fs.readFile()` retorna um `objeto buffer`, um objeto buffer pode armazenar qualquer tipo de arquivo. Podemos
transformar o conteúdo para texto utilizando o método `toString()` ou para json com o método `parse()` do `JSON`.

```javascript
const fs = require('fs').promises;

async function readFile(filePath, parseJSON = false) {
	try {
		const buffer = await fs.readFile(filePath);
		const data = parseJSON ? JSON.parse(buffer) : buffer.toString();
		console.log('DATA', data);
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

(async function () {
	await readFile('./file.txt');
	await readFile('./file.json', true);
})();
```

#### 2 - ESCREVER

No `fs.writeFile()` existem opções de `flags` que indicam como o Node.js vai interagir com o arquivo, como
por exemplo se vai criar o arquivo caso não exista, se vai sobreescrever o arquivo ou adicionar novos
conteúdos, entre outros.

```javascript
const fs = require('fs').promises;

async function writeFile(filePath, content, flag, stringfyJSON = false) {
	try {
		const data = stringfyJSON ? JSON.stringify(content, null, 2) : content;
		await fs.writeFile(filePath, data, { flag: flag });
		console.log('WRITED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

(async function () {
	await writeFile('./file.csv', 'header1;header2;header3\n', 'w');
	await writeFile('./file.csv', 'content1;content2;content3\n', 'a');
	await writeFile('./file.csv', 'content4;content5;content6', 'a');
	await writeFile('./file.json', { key1: 'content1', key2: 'conten2' }, 'w', true);
})();
```

#### 3 - DELETAR

Quando deletamos arquivos com o `unlink()` os mesmos não são enviados para lixeira, eles são removidos
permanentemente.

```javascript
const fs = require('fs').promises;

async function deleteFile(filePath) {
	try {
		await fs.unlink(filePath);
		console.log('DELETED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

(async function () {
	await deleteFile('./file.txt');
})();
```

#### 4 - MOVER

O `fs.rename()` permite mover arquivos.

```javascript
const fs = require('fs').promises;

async function moveFile(currentPath, destinationPath) {
	try {
		await fs.rename(currentPath, destinationPath);
		console.log('MOVED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

(async function () {
	await moveFile('./file.txt', './folder/file.txt');
})();
```

#### 5 - COPIAR

O `fs.copyFile()` permite copiar arquivos.

```javascript
const fs = require('fs').promises;

async function copyFile(filePath, copyPath) {
	try {
		await fs.copyFile(filePath, copyPath);
		console.log('COPIED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

(async function () {
	await copyFile('./file.txt', './fileCopy.txt');
})();
```

#### 6 - LISTAR ARQUIVOS

O `fs.readdir()` permite listar diretórios e com a opção `withFileTypes: true` podemos verificar se o item
é uma pasta ou um arquivo com `isDirectory()`. Com o `path.join()` podemos criar o caminho total dos itens
e com `REGEX` podemos verificar o tipo dos itens.

```javascript
const fs = require('fs').promises;
const path = require('path');

// CONSTRUTOR DE REGEX PARA O TIPO DE ARQUIVO
function fileTypeRegexBuilder(fileType) {
	const pattern = String.raw`.*\.FILE_TYPE$`.replace('FILE_TYPE', fileType);
	const regex = new RegExp(pattern, 'i');
	return regex;
}

// LISTAR ARQUIVOS DE UM DIRETÓRIO
async function listFiles(filePath, fileType = '*', fullPath = false) {
	try {
		const items = await fs.readdir(filePath, { withFileTypes: true });

		const regex = fileTypeRegexBuilder(fileType);

		const files =
			fileType !== '*'
				? items.reduce((accumulator, item) => {
						if (!item.isDirectory() && item.name.match(regex)) {
							const file = fullPath ? path.join(filePath, item.name) : item.name;
							accumulator.push(file);
						}
						return accumulator;
				  }, [])
				: items.reduce((accumulator, item) => {
						if (!item.isDirectory()) {
							const file = fullPath ? path.join(filePath, item.name) : item.name;
							accumulator.push(file);
						}
						return accumulator;
				  }, []);

		console.log(files);
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

(async function () {
	await listFiles('./folder');
	await listFiles('./folder', 'json');
	await listFiles('./folder', 'json', true);
})();
```

#### 7 - LISTAR PASTAS

O `fs.readdir()` permite listar diretórios e com a opção `withFileTypes: true` podemos verificar se o item
é uma pasta ou um arquivo com `isDirectory()`. Com o `path.join()` podemos criar o caminho total dos itens.

```javascript
const fs = require('fs').promises;
const path = require('path');

async function listFolders(filePath, fullPath = false) {
	try {
		const items = await fs.readdir(filePath, { withFileTypes: true });

		const folders = items.reduce((accumulator, item) => {
			if (item.isDirectory()) {
				const folder = fullPath ? path.join(filePath, item.name) : item.name;
				accumulator.push(folder);
			}
			return accumulator;
		}, []);

		console.log(folders);
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

(async function () {
	await listFolders('./folder');
	await listFolders('./folder', true);
})();
```

#### 8 - LINKS

[MÓDULO FILE SYSTEM](https://nodejs.org/api/fs.html)
[MÓDULO PATH](https://nodejs.org/api/path.html)
[REGEX](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
