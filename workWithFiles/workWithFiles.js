// IMPORTANDO O MÓDULO FILE SYSTEM
const fs = require('fs').promises;

// CAMINHO DOS ARQUIVOS
const TXT_FILEPATH = './myFolder/myFile.txt';
const JSON_FILEPATH = './myFolder/myFile.json';
const JSON_FILEPATH_2 = './myFolder/myFile_2.json';
const CSV_FILEPATH = './myFolder/myFile.csv';

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
})();
