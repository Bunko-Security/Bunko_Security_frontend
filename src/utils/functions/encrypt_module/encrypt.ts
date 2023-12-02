import crypto, { KeyObject } from "crypto";
import type { RSAKeys, hashData, recreateHash } from "./models";

const webCrypto = crypto.webcrypto;

// export type encFileAndencPass = {
// 	file: Buffer;
// 	loginAndencPass: loginAndencPass[];
// };
// export type loginAndencPass = {
// 	login: string;
// 	pass: string;
// };
// export type encFileAndPass = {
// 	file: Buffer;
// 	pass: string;
// };
// export type inputToEncoding = {
// 	pub_key: string;
// 	login: string;
// };

// const scrypt_hash = (key: string, salt: string): Promise<string | "error"> => {
// 	return new Promise<string>((resolve, reject) => {
// 		crypto.scrypt(key, salt, 128, (err, derivedKey) => {
// 			if (err) reject(err);
// 			resolve(derivedKey.toString("hex"));
// 		});
// 	}).then((value) => {
// 		return value;
// 	});
// };

// * Генерация ключа хэширования
const keyGen256 = (): string => crypto.randomBytes(22).toString("base64");

// const encrypt_data = (data: Buffer, key: string): Buffer => {
// 	const initializationVector = crypto.randomBytes(16);
// 	const cipher = crypto.createCipheriv("aes-256-ctr", key, initializationVector);

// 	const encrypted = Buffer.concat([initializationVector, cipher.update(data), cipher.final()]);

// 	return encrypted;
// };

// const decrypt_data = (encryptedData: Buffer, dec_passkey: string): Buffer => {
// 	const initializationVector = encryptedData.slice(0, 16);
// 	encryptedData = encryptedData.slice(16);
// 	const decipher = crypto.createDecipheriv("aes-256-ctr", dec_passkey, initializationVector);
// 	return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
// };

export class Encrypt {
	// * Генерация RSA-ключей
	static keyGen = (hashEncrypt: string): RSAKeys => {
		try {
			const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
				modulusLength: 2048,
				publicKeyEncoding: {
					type: "spki",
					format: "pem",
				},
				privateKeyEncoding: {
					cipher: "aes-256-cbc",
					type: "pkcs8",
					format: "pem",
					passphrase: hashEncrypt,
				},
			});

			return { publicKey: publicKey, privateKey: privateKey };
		} catch (error) {
			console.log(error);
			throw new Error("Неудачная попытка генерации ключей");
		}
	};

	// //2. Input: Data, Public rsa keys
	// //  Output:  Encrypted data and massive with:  Encrypted passphrase and login
	// export const data_stream_encryption = (
	// 	stream: Buffer,
	// 	pub_key_login: inputToEncoding[],
	// ): encFileAndencPass | "error" => {
	// 	const encrypt_keypass = (pub_key: string, privkey: string): string => {
	// 		crypto.publicEncrypt(pub_key, Buffer.from(privkey));

	// 		return crypto.publicEncrypt(pub_key, Buffer.from(privkey)).toString("base64");
	// 	};

	// 	try {
	// 		let pass_storage: loginAndencPass[] = [];
	// 		const key = keypass_gen_32();
	// 		let enc_data = encrypt_data(stream, key);
	// 		pub_key_login.forEach((pubkl) => {
	// 			const enckey = encrypt_keypass(pubkl.pub_key, key);

	// 			pass_storage.push({
	// 				pass: enckey,
	// 				login: pubkl.login,
	// 			});
	// 		});

	// 		return { file: enc_data, loginAndencPass: pass_storage } as encFileAndencPass;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return "error";
	// 	}
	// };

	// //3. Input: Encrypted private rsa key, user password;
	// //  Output: Private rsa key
	// export const private_key_decryption = (enc_priv_key: string, passphrase: string): KeyObject => {
	// 	return crypto.createPrivateKey({ passphrase: passphrase, key: enc_priv_key });
	// };

	// //4.  Input: Encrypted data, Encrypted passphrase for this data, private rsa key, user password;
	// //   Output: Data
	// export const data_stream_decryption = (
	// 	encryptedData: Buffer,
	// 	enc_passkey: string,
	// 	enc_priv_key: string,
	// 	passphrase: string,
	// ): Buffer | "error" => {
	// 	const decrypt_keypass = (priv_key: KeyObject, enc_key: string): string => {
	// 		return crypto.privateDecrypt(priv_key, Buffer.from(enc_key, "base64")).toString("utf-8");
	// 	};
	// 	try {
	// 		//Расшифровываем encrypted private rsa key
	// 		const dec_privkey: KeyObject = private_key_decryption(enc_priv_key, passphrase);

	// 		//Расшифровываем encrypted passphrase for data
	// 		const dec_passkey: string = decrypt_keypass(dec_privkey, enc_passkey);

	// 		return decrypt_data(encryptedData, dec_passkey);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return "error";
	// 	}
	// };
	// // 5.
	// export const data_stream_encryption_public = (data: Buffer): encFileAndPass | "error" => {
	// 	try {
	// 		let key256bit = keypass_gen_32();
	// 		return { file: encrypt_data(data, key256bit), pass: key256bit } as encFileAndPass;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return "error";
	// 	}
	// };
	// // 6.
	// export const data_stream_decryption_public = (data: Buffer, key: string): Buffer | "error" => {
	// 	try {
	// 		return decrypt_data(data, key);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return "error";
	// 	}
	// };

	// * Генерация хэша
	static generateHash = (login: string, password: string): hashData => {
		try {
			const key = keyGen256();
			const hash = crypto.scryptSync(key, password.concat("&" + login), 128).toString("hex");
			const hashLength = hash.length;

			return {
				hashEncrypt: hash.substring(0, hashLength / 2),
				hashAuth: hash.substring(hashLength / 2, hashLength),
				keyHash: key,
			};
		} catch (error) {
			console.log(error);
			throw new Error("Неудачная попытка генерации хэша");
		}
	};

	// * Воссоздание ключа хэширования
	static recreateHash = (keyHash: string, login: string, password: string): recreateHash => {
		try {
			let hash = crypto.scryptSync(keyHash, password.concat("&" + login), 128).toString("hex");
			let hashLength = hash.length;

			return {
				hashEncrypt: hash.substring(0, hashLength / 2),
				hashAuth: hash.substring(hashLength / 2, hashLength),
			};
		} catch (error) {
			console.log(error);
			throw new Error("Неудачная попытка восстановления хэша");
		}
	};
}
