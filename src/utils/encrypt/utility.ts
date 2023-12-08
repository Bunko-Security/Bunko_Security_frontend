import forge from "node-forge";

// * Генерация ключа хэширования
export const keypassGen256 = (): string => forge.util.encode64(forge.random.getBytesSync(22));
