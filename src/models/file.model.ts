export interface IUploadFile {
	fileData: {
		delete_date: string;
		file: File;
	};
	fileInfo: {
		user_to: string;
		secret_key: string;
	}[];
}

export interface IFile {
	file_id: number;
	filename: string;
	delete_date: string;
}

export interface IDownloadFileData {
	secret_key: string;
	priv_key: string;
}

export interface IDownloadFileWithData {
	file: ArrayBuffer;
	name: string | undefined;
	type: string | undefined;
	data: IDownloadFileData;
}
