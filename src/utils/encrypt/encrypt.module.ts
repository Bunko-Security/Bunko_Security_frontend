import forge from "node-forge";
import type {
	IDataEncodingFile,
	ILoginWithPass,
	IEncryptFileWithEncryptData,
	IEncryptFileWithPass,
} from "./models";
import { keypassGen256 } from "./utility";


// * Шифрование файла при помощи forge-node
const encryptData = (data: Buffer, keyEncrypt: string): Buffer => {
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

export class EncryptModule {
	// * Шифрования файла
	static encryptFile = (
		file: Buffer,
		dataEncodingFile: IDataEncodingFile[],
	): IEncryptFileWithEncryptData => {
		const encPrivateKey = (publicKey: string, privateKey: string): string => {
			let pubKey = forge.pki.publicKeyFromPem(publicKey);
			let encryptKey = pubKey.encrypt(privateKey, "RSA-OAEP");

			return Buffer.from(encryptKey, "binary").toString("base64");
		};

		try {
			const passStorage: ILoginWithPass[] = [];
			const key = keypassGen256();
			const encryptFile = encryptData(file, key);

			dataEncodingFile.forEach((data) => {
				const encryptKey = encPrivateKey(data.pub_key, key);

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

	// * Шифрование общедоступного файла
	static encryptPublicFile = (file: Buffer): IEncryptFileWithPass => {
		try {
			const key = keypassGen256();
			const encryptFile = encryptData(file, key);

			return { file: encryptFile, pass: key };
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка шифрования файла!");
		}
	};
}
