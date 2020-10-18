### Trabalhando com Arquivos no Node.js

Com o Node.js podemos manipular arquivos com o Módulo `fs - File System`

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

#### 5 - LINKS

[MÓDULO FILE SYSTEM](https://nodejs.org/api/fs.html)
