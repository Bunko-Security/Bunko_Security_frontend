export interface IRSAKeys {
	publicKey: string;
	privateKey: string;
}

export interface IHashData {
	hashEncrypt: string;
	hashAuth: string;
	keyHash: string;
}

export interface IRecreateHash {
	hashEncrypt: string;
	hashAuth: string;
}

export interface IDataEncodingFile {
	pub_key: string;
	login: string;
}

export interface IEncryptFileWithPass {
	file: Buffer;
	pass: string;
}

export interface ILoginWithPass {
	user_to: string;
	secret_key: string;
}

export interface IEncryptFileWithEncryptData {
	file: Buffer;
	data: ILoginWithPass[];
}
