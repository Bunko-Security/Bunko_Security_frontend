import apiWithAuth from "@/configs/axios/axios.config";
import type {
  IDownloadFileData,
	IDownloadFileWithData,
	IMyFile,
	IUploadFile,
	IUploadPublicFile,
} from "@/models/file.model";
import type { IParamsSearch } from "@/models/params.model";
import type { IDataEncodingFile } from "@/utils/encrypt/models";
import type { AxiosProgressEvent } from "axios";

export class MyFilesService {
	private static pathDefault = "/files";

	static async getPubKeysFriends(logins: string[]): Promise<IDataEncodingFile[] | null> {
		try {
			const dataEncodingFile = await apiWithAuth.post<IDataEncodingFile[]>(
				"/users/pub_keys",
				logins,
			);

			return dataEncodingFile.data;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async uploadFile(
		uploadFile: IUploadFile,
		onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
	): Promise<undefined | null> {
		try {
			const formData = new FormData();
			formData.append("file", uploadFile.fileData.file);
			formData.append("delete_date", uploadFile.fileData.delete_date);

			const fileId = await apiWithAuth.post<{ file_id: number }>(
				`${this.pathDefault}/private`,
				formData,
				{ onUploadProgress: onUploadProgress },
			);

			await apiWithAuth.post<string>(
				`${this.pathDefault}/private/${fileId.data.file_id}/data`,
				uploadFile.fileInfo,
			);
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async uploadPublicFile(
		uploadFile: IUploadPublicFile,
		onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
	): Promise<undefined | null> {
		try {
			const formData = new FormData();
			formData.append("file", uploadFile.file);
			formData.append("delete_date", uploadFile.delete_date);
			formData.append("secret_key", uploadFile.secret_key);

			await apiWithAuth.post<string>(`${this.pathDefault}/public`, formData, {
				onUploadProgress: onUploadProgress,
			});
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async getMyFiles(params?: IParamsSearch): Promise<IMyFile[]> {
		try {
			const files = await apiWithAuth.get<IMyFile[]>(`${this.pathDefault}/my`, { params });

			return files.data;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	static async downloadFile(
		fileId: number | string,
		onDownloadProgress: (progressEvent: AxiosProgressEvent) => void,
	): Promise<IDownloadFileWithData | null> {
		try {
			const file = await apiWithAuth.get<ArrayBuffer>(`${this.pathDefault}/${fileId}`, {
				responseType: "arraybuffer",
				onDownloadProgress: onDownloadProgress,
			});

			let fileName: string | undefined = file.headers["content-disposition"];
			const fileType: string | undefined = file.headers["content-type"];

			// TODO: Вынести в отдельную функцию
			if (fileName?.includes("utf-8")) {
				fileName = fileName.split("filename*=utf-8''")[1];
			} else if (fileName) {
				fileName = fileName.split('filename="')[1].split('"')[0];
			}

			const dataFile = await apiWithAuth.get<IDownloadFileData>(
				`${this.pathDefault}/${fileId}/data`,
			);

			return { file: file.data, name: fileName, type: fileType, data: dataFile.data };
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async deleteFile(fileId: number | string): Promise<undefined | null> {
		try {
			await apiWithAuth.delete(`${this.pathDefault}/${fileId}`);
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async deleteFiles(): Promise<undefined | null> {
		try {
			await apiWithAuth.delete(`${this.pathDefault}/my`);
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}
