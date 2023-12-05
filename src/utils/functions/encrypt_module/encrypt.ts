import forge from "node-forge";
import type {
	IRSAKeys,
	IHashData,
	IDataEncodingFile,
	IRecreateHash,
	ILoginWithPass,
	IEncryptFileWithEncryptData,
} from "./models";

// // 5. Шифрование общедоступных файлов
// export const data_stream_encryption_public = (data: Buffer): encFileAndPass | 'error' => {

//     try {
//         let key256bit = keypass_gen_256bit()
//         return { file: encrypt_data(data, key256bit), pass: key256bit }
//     } catch (error) {
//         console.log(error)
//         return 'error'
//     }
// }
// // 6. Расшифрование общедоступных файлов
// export const data_stream_decryption_public = (data: Buffer, key: string): Buffer | 'error' => {
//     try {
//         return decrypt_data(data, key)
//     } catch (error) {
//         console.log(error)
//         return 'error'
//     }
// }

const keypassGen256 = (): string => forge.util.encode64(forge.random.getBytesSync(22));

const decryptPrivateKey = (encPrivateKey: string, hashEncrypt: string): forge.pki.rsa.PrivateKey => {
	return forge.pki.decryptRsaPrivateKey(encPrivateKey, hashEncrypt);
};

const decryptData = (encryptedData: Buffer, decPassphrase: string): Buffer => {
	let initializationVector = encryptedData.slice(0, 16);
	encryptedData = encryptedData.slice(16);

	const decipher = forge.cipher.createDecipher("AES-CBC", forge.util.createBuffer(decPassphrase));
	decipher.start({ iv: forge.util.createBuffer(initializationVector.toString("binary")) });
	decipher.update(forge.util.createBuffer(encryptedData.toString("binary")));
	decipher.finish();

	return Buffer.from(decipher.output.getBytes(), "binary");
};

export class Encrypt {
	// * Генерация ключа хэширования

	// * Генерация RSA-ключей
	static genRSAKey = (hashEncrypt: string): IRSAKeys => {
		try {
			const keyPair = forge.pki.rsa.generateKeyPair(2048);
			const privateKey = forge.pki.encryptRsaPrivateKey(keyPair.privateKey, hashEncrypt);
			const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);

			return { publicKey, privateKey };
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка генерации RSA-ключей");
		}
	};

	// * Генерация хэша
	static createHash = (login: string, password: string): IHashData => {
		try {
			const key = keypassGen256();
			const hash = forge.md.sha256
				.create()
				.update(key)
				.update(password.concat("&" + login))
				.digest()
				.toHex();
			const hashLength = hash.length;

			return {
				hashEncrypt: hash.substring(0, hashLength / 2),
				hashAuth: hash.substring(hashLength / 2, hashLength),
				keyHash: key,
			};
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка генерации хэша!");
		}
	};

	// * Воссоздание хэша
	static recreateHash = (keyHash: string, login: string, password: string): IRecreateHash => {
		try {
			const hash = forge.md.sha256
				.create()
				.update(keyHash)
				.update(password.concat("&" + login))
				.digest()
				.toHex();
			const hashLength = hash.length;

			return {
				hashEncrypt: hash.substring(0, hashLength / 2),
				hashAuth: hash.substring(hashLength / 2, hashLength),
			};
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка воссоздания хэша!");
		}
	};

	static encryptData = (data: Buffer, keyEncrypt: string): Buffer => {
		const initializationVector = forge.random.getBytesSync(16);
		const cipher = forge.cipher.createCipher("AES-CBC", forge.util.createBuffer(keyEncrypt));
		cipher.start({ iv: initializationVector });
		cipher.update(forge.util.createBuffer(data.toString("binary")));
		cipher.finish();

		return Buffer.concat([
			Buffer.from(initializationVector, "binary"),
			Buffer.from(cipher.output.getBytes(), "binary"),
		]);
	};

	// * Шифрования файла
	static encryptFile = (
		file: Buffer,
		dataEncodingFile: IDataEncodingFile[],
	): IEncryptFileWithEncryptData => {
		const encryptKeypass = (publicKey: string, privateKey: string): string => {
			let pubKey = forge.pki.publicKeyFromPem(publicKey);
			let encryptKey = pubKey.encrypt(privateKey, "RSA-OAEP");

			return Buffer.from(encryptKey, "binary").toString("base64");
		};

		try {
			const passStorage: ILoginWithPass[] = [];
			const key = keypassGen256();
			const encryptFile = this.encryptData(file, key);

			dataEncodingFile.forEach((data) => {
				const encryptKey = encryptKeypass(data.pub_key, key);

				passStorage.push({
					secret_key: encryptKey,
					user_to: data.login,
				});
			});

			return { file: encryptFile, data: passStorage };
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка шифрования файла!");
		}
	};

	// * Расшифровка файла
	static decryptFile = (
		encryptedData: Buffer,
		encKeyHashFile: string,
		encPrivateKey: string,
		hashEncrypt: string,
	): Buffer => {
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

			return decryptData(encryptedData, decKeyHashFile);
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка расшифровки файла!");
		}
	};
}
