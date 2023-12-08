import apiWithAuth from "@/configs/axios/axios.config";
import type {
	IDownloadFileData,
	IDownloadFileWithData,
	IFile,
	IUploadFile,
} from "@/models/file.model";
import type { IDataEncodingFile } from "@/utils/encrypt/models";
import { AxiosProgressEvent } from "axios";

export class MyFilesService {
	private static pathExchanger = "/exchanger";

	static async getPubKeysFriends(logins: string[]): Promise<IDataEncodingFile[] | null> {
		try {
			const dataEncodingFile = await apiWithAuth.post<IDataEncodingFile[]>(
				`${this.pathExchanger}/users/pub_keys`,
				logins,
			);

			return dataEncodingFile.data;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async uploadFile(uploadFile: IUploadFile): Promise<undefined | null> {
		try {
			const formData = new FormData();
			formData.append("file", uploadFile.fileData.file);
			formData.append("delete_date", uploadFile.fileData.delete_date);

			const fileId = await apiWithAuth.post<{ file_id: number }>(
				`${this.pathExchanger}/file/upload`,
				formData,
			);

			await apiWithAuth.post(
				`${this.pathExchanger}/files/${fileId.data.file_id}/data`,
				uploadFile.fileInfo,
			);
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async getMyFiles(): Promise<IFile[]> {
		try {
			const files = await apiWithAuth.get<IFile[]>(`${this.pathExchanger}/files/my`);

			return files.data;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	static async downloadFile(
		file_id: number | string,
		onDownloadProgress: (progressEvent: AxiosProgressEvent) => void,
	): Promise<IDownloadFileWithData | null> {
		try {
			const file = await apiWithAuth.get<ArrayBuffer>(`${this.pathExchanger}/files/${file_id}`, {
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
				`${this.pathExchanger}/files/${file_id}/data`,
			);

			return { file: file.data, name: fileName, type: fileType, data: dataFile.data };
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}
