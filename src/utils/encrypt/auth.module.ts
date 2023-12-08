import forge from "node-forge";
import { keypassGen256 } from "./utility";
import type { IHashData, IRSAKeys, IRecreateHash } from "./models";

export class AuthModule {
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
}
