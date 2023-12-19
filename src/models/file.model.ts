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

export interface IUploadPublicFile {
	file: File;
	delete_date: string;
	secret_key: string;
}

export interface IMyFile {
	file_id: number;
	filename: string;
	delete_date: string;
}

export interface IOtherFile extends IMyFile {
	user_from: string;
}

export interface IDownloadFileData {
	secret_key: string;
	priv_key: string | null;
}

export interface IDownloadFileWithData {
	file: ArrayBuffer;
	name: string | undefined;
	type: string | undefined;
	data: IDownloadFileData;
}

export interface IDownloadFileInfo {
	fileId: string | number;
	fileName: string;
}

export interface IUploadFileInfo {
	file: File;
	selectedFriends: string[];
	endDate: string;
}
