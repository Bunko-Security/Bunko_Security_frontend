import forge from "node-forge";
import type {
	IDataEncodingFile,
	ILoginWithPass,
	IEncryptFileWithEncryptData,
	IEncryptFileWithPass,
} from "./models";
import { encryptOrDecryptUpdatePeace, keypassGen256 } from "./utility";

// * Шифрование файла при помощи forge-node
const encryptData = async (
	data: Buffer,
	keyEncrypt: string,
	cbCountIters?: (count: number) => void,
	cbIterNow?: (iter: number) => void,
): Promise<Buffer> => {
	const peace: number = 1024 * 400;
	const initializationVector = forge.random.getBytesSync(16);
	const iter = Math.floor(data.length / peace) + 1;
	cbCountIters?.(iter);
	const encFilePeaces: Buffer[] = [];

	const cipher = forge.cipher.createCipher("AES-CTR", forge.util.createBuffer(keyEncrypt));
	cipher.start({ iv: initializationVector });

	const delayUpdate = 700;

	for (let i = 0; i < iter; i++) {
		cbIterNow?.(i + 1);

		if (i == 0) {
			await encryptOrDecryptUpdatePeace(cipher, data, delayUpdate, 0, peace);
		} else if (i === iter - 1) {
			await encryptOrDecryptUpdatePeace(cipher, data, delayUpdate, peace * i);
		} else {
			await encryptOrDecryptUpdatePeace(cipher, data, delayUpdate, peace * i, peace * (i + 1));
		}

		encFilePeaces.push(Buffer.from(cipher.output.getBytes(), "binary"));
	}

	cipher.finish();

	return Buffer.concat([Buffer.from(initializationVector, "binary"), Buffer.concat(encFilePeaces)]);
};

export class EncryptModule {
	// * Шифрования файла
	static encryptFile = async (
		file: Buffer,
		dataEncodingFile: IDataEncodingFile[],
		cbCountIters?: (count: number) => void,
		cbIterNow?: (iter: number) => void,
	): Promise<IEncryptFileWithEncryptData> => {
		const encPrivateKey = (publicKey: string, privateKey: string): string => {
			let pubKey = forge.pki.publicKeyFromPem(publicKey);
			let encryptKey = pubKey.encrypt(privateKey, "RSA-OAEP");

			return Buffer.from(encryptKey, "binary").toString("base64");
		};

		try {
			const passStorage: ILoginWithPass[] = [];
			const key = keypassGen256();
			const encryptFile = await encryptData(file, key, cbCountIters, cbIterNow);

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
	static encryptPublicFile = async (
		file: Buffer,
		cbCountIters?: (count: number) => void,
		cbIterNow?: (iter: number) => void,
	): Promise<IEncryptFileWithPass> => {
		try {
			const key = keypassGen256();
			const encryptFile = await encryptData(file, key, cbCountIters, cbIterNow);

			return { file: encryptFile, pass: key };
		} catch (error) {
			console.log(error);
			throw new Error("Ошибка шифрования файла!");
		}
	};
}
