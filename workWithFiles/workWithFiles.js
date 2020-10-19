// IMPORTANDO O MÓDULO FILE SYSTEM
const fs = require('fs').promises;
const path = require('path');

// CAMINHO DOS ARQUIVOS
const TXT_FILEPATH = './myFolder/myFile.txt';
const JSON_FILEPATH = './myFolder/myFile.json';
const JSON_FILEPATH_2 = './myFolder/myFile_2.json';
const CSV_FILEPATH = './myFolder/myFile.csv';
const WWF_DIR = './myFolder';

// LER ARQUIVOS
async function readFile(filePath, parseJSON = false) {
	try {
		const buffer = await fs.readFile(filePath);
		const data = parseJSON ? JSON.parse(buffer) : buffer.toString();
		console.log('DATA', data);
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

// ESCREVER ARQUIVOS
async function writeFile(filePath, content, flag, stringfyJSON = false) {
	try {
		const data = stringfyJSON ? JSON.stringify(content, null, 2) : content;
		await fs.writeFile(filePath, data, { flag: flag });
		console.log('WRITED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

// DELETAR ARQUIVOS
async function deleteFile(filePath) {
	try {
		await fs.unlink(filePath);
		console.log('DELETED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

// MOVER ARQUIVOS
async function moveFile(currentPath, destinationPath) {
	try {
		await fs.rename(currentPath, destinationPath);
		console.log('MOVED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

// COPIAR ARQUIVOS
async function copyFile(filePath, copyPath) {
	try {
		await fs.copyFile(filePath, copyPath);
		console.log('COPIED');
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
	}
}

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

// LISTAR ARQUIVOS DE UM DIRETÓRIO
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

// TESTES
(async function () {
	// LER ARQUIVOS
	await readFile(TXT_FILEPATH);
	await readFile(JSON_FILEPATH, true);

	// ESCREVER ARQUIVOS
	await writeFile(CSV_FILEPATH, 'header1;header2;header3\n', 'w');
	await writeFile(CSV_FILEPATH, 'content1;content2;content3\n', 'a');
	await writeFile(CSV_FILEPATH, 'content4;content5;content6', 'a');
	await writeFile(JSON_FILEPATH_2, { key1: 'content1', key2: 'conten2' }, 'w', true);

	// DELETAR ARQUIVOS
	const DELETED_FILEPATH = './myFolder/deleted.txt'; // *CRIAR PARA O TESTE
	await writeFile(DELETED_FILEPATH, 'deleted', 'w'); // *CRIAR PARA O TESTE
	await deleteFile(DELETED_FILEPATH);

	// MOVER ARQUIVOS
	const CURRENT_PATH = './myFolder/moved.txt'; // *CRIAR PARA O TESTE
	const DESTINATION_PATH = './mySecondFolder/moved.txt';
	await writeFile(CURRENT_PATH, 'moved', 'w'); // *CRIAR PARA O TESTE
	await moveFile(CURRENT_PATH, DESTINATION_PATH);
	await deleteFile(DESTINATION_PATH); // *DELETAR PARA O TESTE

	// COPIAR ARQUIVOS
	await copyFile(TXT_FILEPATH, './myFolder/myFileCopy.txt');

	// LISTAR ARQUIVOS DE UM DIRETÓRIO
	await listFiles(WWF_DIR);
	await listFiles(WWF_DIR, 'json');
	await listFiles(WWF_DIR, 'json', true);

	// LISTAR ARQUIVOS DE UM DIRETÓRIO
	await listFolders(WWF_DIR);
	await listFolders(WWF_DIR, true);
})();
