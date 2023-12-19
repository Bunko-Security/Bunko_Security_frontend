import forge from "node-forge";
import { promiseSetTimeout } from "../functions/promiseSetTimeout";

// * Генерация ключа хэширования
export const keypassGen256 = (): string => forge.util.encode64(forge.random.getBytesSync(22));

// * Промифицированный setTimeout с шифрованием/дешифрованием кусков файла
export const encryptOrDecryptUpdatePeace = (
	cipher: forge.cipher.BlockCipher,
	data: Buffer,
	delay: number,
	startPeace: number,
	endPeace?: number,
) =>
	new Promise(async (resolve) => {
		await promiseSetTimeout(() => {
			cipher.update(forge.util.createBuffer(data.slice(startPeace, endPeace).toString("binary")));
			resolve(undefined);
		}, delay);
	});
