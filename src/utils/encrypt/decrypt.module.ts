import forge from "node-forge";
import { encryptOrDecryptUpdatePeace } from "./utility";

// * Расшифровка файла при помощи forge-node
const decryptData = async (
	encryptedData: Buffer,
	decPassphrase: string,
	cbCountIters?: (count: number) => void,
	cbIterNow?: (iter: number) => void,
): Promise<Buffer> => {
	const peace: number = 1024 * 400; // 10
	const initializationVector = encryptedData.slice(0, 16);
	const iter = Math.floor(encryptedData.length / peace) + 1;
	cbCountIters?.(iter);
	const encFilePeaces: Buffer[] = [];
	encryptedData = encryptedData.slice(16);

	const decipher = forge.cipher.createDecipher("AES-CTR", forge.util.createBuffer(decPassphrase));
	decipher.start({ iv: forge.util.createBuffer(initializationVector.toString("binary")) });

	const delayUpdate = 700;

	for (let i = 0; i < iter; i++) {
		cbIterNow?.(i + 1);

		if (i === 0) {
			await encryptOrDecryptUpdatePeace(decipher, encryptedData, delayUpdate, 0, peace);
		} else if (i === iter - 1) {
			await encryptOrDecryptUpdatePeace(decipher, encryptedData, delayUpdate, peace * i);
		} else {
			await encryptOrDecryptUpdatePeace(
				decipher,
				encryptedData,
				delayUpdate,
				peace * i,
				peace * (i + 1),
			);
		}

		encFilePeaces.push(Buffer.from(decipher.output.getBytes(), "binary"));
	}

	decipher.finish();

	return Buffer.concat(encFilePeaces);
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
		cbCountIters?: (count: number) => void,
		cbIterNow?: (iter: number) => void,
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

	// * Расшифровка общедоступного файла
	static decryptPublicFile = async (
		data: Buffer,
		key: string,
		cbCountIters?: (count: number) => void,
		cbIterNow?: (iter: number) => void,
	): Promise<Buffer> => {
		try {
			return await decryptData(data, key, cbCountIters, cbIterNow);
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка расшифровки файла!");
		}
	};
}
