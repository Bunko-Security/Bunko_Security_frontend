export interface RSAKeys {
	publicKey: string;
	privateKey: string;
}

export interface hashData {
	hashEncrypt: string;
	hashAuth: string;
	keyHash: string;
}

export interface recreateHash {
	hashEncrypt: string;
	hashAuth: string;
}
