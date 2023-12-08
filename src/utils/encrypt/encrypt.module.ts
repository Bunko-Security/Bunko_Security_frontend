import forge from "node-forge";
import type { IDataEncodingFile, ILoginWithPass, IEncryptFileWithEncryptData } from "./models";
import { keypassGen256 } from "./utility";

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
}
