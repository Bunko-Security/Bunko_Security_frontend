export interface IUploadFile {
	fileData: {
		end_date: string;
		file: File;
	};
	fileInfo: {
		login_to: string;
		secret_key: string;
	}[];
}
