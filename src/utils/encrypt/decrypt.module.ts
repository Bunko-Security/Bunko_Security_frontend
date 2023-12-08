import forge from "node-forge";
import { promiseSetTimeout } from "../functions/promiseSetTimeout";

const decipherUpdatePeace = (
	decipher: forge.cipher.BlockCipher,
	encryptedData: Buffer,
	delay: number,
	startPeace: number,
	endPeace?: number,
) =>
	new Promise(async (resolve) => {
		await promiseSetTimeout(() => {
			decipher.update(
				forge.util.createBuffer(encryptedData.slice(startPeace, endPeace).toString("binary")),
			);
			console.log(1);
			resolve(undefined);
		}, delay);
	});

// * Расшифровка файла при помощи forge-node
const decryptData = async (
	encryptedData: Buffer,
	decPassphrase: string,
	cbCountIters: (count: number) => void,
	cbIterNow: (iter: number) => void,
): Promise<Buffer> => {
	const peace: number = 1024 * 200; // 10
	const initializationVector = encryptedData.slice(0, 16);
	const iter = Math.floor(encryptedData.length / peace) + 1;
	cbCountIters(iter);
	const encFilePeace: Buffer[] = [];
	encryptedData = encryptedData.slice(16);

	const decipher = forge.cipher.createDecipher("AES-CBC", forge.util.createBuffer(decPassphrase));
	decipher.start({ iv: forge.util.createBuffer(initializationVector.toString("binary")) });

	const delayUpdate = 700;

	for (let i = 0; i < iter; i++) {
		cbIterNow(i + 1);

		if (i === 0) {
			await decipherUpdatePeace(decipher, encryptedData, delayUpdate, 0, peace);
		} else if (i === iter - 1) {
			await decipherUpdatePeace(decipher, encryptedData, delayUpdate, peace * i);
		} else {
			await decipherUpdatePeace(decipher, encryptedData, delayUpdate, peace * i, peace * (i + 1));
		}
	}

	encFilePeace.push(Buffer.from(decipher.output.getBytes(), "binary"));
	decipher.finish();

	return Buffer.concat(encFilePeace);
};

// * Расшифровка приватного ключа
const decryptPrivateKey = (
	encPrivateKey: string,
	hashEncrypt: string,
): forge.pki.rsa.PrivateKey => {
	return forge.pki.decryptRsaPrivateKey(encPrivateKey, hashEncrypt);
};

export class DecryptModule {
	// * Расшифровка файла
	static decryptFile = async (
		encryptedData: Buffer,
		encKeyHashFile: string,
		encPrivateKey: string,
		hashEncrypt: string,
		cbCountIters: (count: number) => void,
		cbIterNow: (iter: number) => void,
	): Promise<Buffer> => {
		const decryptEncKeyHashFile = (
			decPrivateKey: forge.pki.rsa.PrivateKey,
			encKeyHashFile: string,
		): string => {
			let decPassphrase = decPrivateKey.decrypt(
				Buffer.from(encKeyHashFile, "base64").toString("binary"),
				"RSA-OAEP",
			);
			return decPassphrase;
		};
		try {
			// Расшифровываем encrypted private rsa key
			const decPrivateKey: forge.pki.rsa.PrivateKey = decryptPrivateKey(encPrivateKey, hashEncrypt);

			// Расшифровываем encrypted passphrase for data
			const decKeyHashFile: string = decryptEncKeyHashFile(decPrivateKey, encKeyHashFile);

			return await decryptData(encryptedData, decKeyHashFile, cbCountIters, cbIterNow);
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка расшифровки файла!");
		}
	};

	// static decryptFile = (
	// 	encryptedData: Buffer,
	// 	encKeyHashFile: string,
	// 	encPrivateKey: string,
	// 	hashEncrypt: string,
	// ): Promise<Buffer> =>
	// 	new Promise(async (resolve, reject) => {
	// 		const decryptEncKeyHashFile = (
	// 			decPrivateKey: forge.pki.rsa.PrivateKey,
	// 			encKeyHashFile: string,
	// 		): string => {
	// 			let decPassphrase = decPrivateKey.decrypt(
	// 				Buffer.from(encKeyHashFile, "base64").toString("binary"),
	// 				"RSA-OAEP",
	// 			);
	// 			return decPassphrase;
	// 		};
	// 		try {
	// 			// Расшифровываем encrypted private rsa key
	// 			const decPrivateKey: forge.pki.rsa.PrivateKey = decryptPrivateKey(
	// 				encPrivateKey,
	// 				hashEncrypt,
	// 			);

	// 			// Расшифровываем encrypted passphrase for data
	// 			const decKeyHashFile: string = decryptEncKeyHashFile(decPrivateKey, encKeyHashFile);

	// 			resolve(await decryptData(encryptedData, decKeyHashFile));
	// 		} catch (error) {
	// 			console.log(error);
	// 			reject("Ошибка расшифровки файла!");
	// 		}
	// 	});
}
