import axios from "axios";
import apiWithAuth from "@/configs/axios/axios.config";
import type {
	IAvatarUser,
	ICreateUser,
	ILoginUser,
	IToken,
	IUpdateUser,
	IUser,
} from "@/models/user.model";
import { Encrypt } from "@/utils/functions/encrypt_module/encrypt";
import { LOCAL_STORAGE } from "@/utils/keysName";
import type {
	IFile,
	IDownloadFileData,
	IUploadFile,
	IDownloadFileWithData,
} from "@/models/file.model";
import { IFriend } from "@/models/friend.model";
import { IDataEncodingFile } from "@/utils/functions/encrypt_module/models";

// TODO: Подумать об обработке ошибок

class UserService {
	private static pathAuth = "/auth";
	private static pathProfile = "/profile";
	private static pathFriends = "/friends";
	private static pathExchanger = "/exchanger";

	static async getUser(): Promise<IUser | null> {
		try {
			const user = await apiWithAuth.get<IUser>(this.pathProfile);

			return user.data;
		} catch (e) {
			return null;
		}
	}

	static async register(user: ICreateUser): Promise<IUser | null> {
		try {
			await apiWithAuth.post<IToken>(`${this.pathAuth}/register`, user);
			const gottenUser = await this.getUser();
			localStorage.setItem(LOCAL_STORAGE.IS_LOGIN, "true");

			return gottenUser;
		} catch (e) {
			return null;
		}
	}

	static async login(user: ILoginUser): Promise<IUser | null> {
		try {
			const keyHash = await apiWithAuth.get<{ hash_key: string }>(`${this.pathAuth}/hash_key`, {
				params: { login: user.login },
			});

			const { hashEncrypt, hashAuth } = Encrypt.recreateHash(
				keyHash.data.hash_key,
				user.login,
				user.password,
			);
			localStorage.setItem(LOCAL_STORAGE.HASH_ENCRYPT, hashEncrypt);

			await apiWithAuth.post(`${this.pathAuth}/login`, {
				login: user.login,
				auth_hash: hashAuth,
			});

			const gottenUser = await this.getUser();
			localStorage.setItem(LOCAL_STORAGE.IS_LOGIN, "true");

			return gottenUser;
		} catch (e) {
			return null;
		}
	}

	static async logout(): Promise<true | null> {
		try {
			await apiWithAuth.get<string>(`${this.pathAuth}/logout`);
			localStorage.removeItem(LOCAL_STORAGE.IS_LOGIN);

			return true;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async getUserWithRefreshToken(): Promise<IUser | null> {
		try {
			await axios.get<IToken>(`${process.env.SERVER_URL}${this.pathAuth}/refresh`, {
				withCredentials: true,
			});
			const user = await this.getUser();

			return user;
		} catch (e) {
			localStorage.removeItem(LOCAL_STORAGE.IS_LOGIN);
			return null;
		}
	}

	// TODO: Подумать над обработкой ошибок
	static async updateUser(updateUser: IUpdateUser): Promise<IUser | null> {
		await apiWithAuth.put(`${this.pathProfile}/username`, updateUser);
		const user = await this.getUser();

		return user;
	}

	static async updateAvatar(avatar: Blob, nameAvatar?: string): Promise<IUser | null> {
		try {
			const formData = new FormData();
			formData.append("new_avatar", avatar, nameAvatar || "1232d21d12d1.png");

			await apiWithAuth.put(`${this.pathProfile}/avatar`, formData);
			const newUser = await this.getUser();

			return newUser;
		} catch (e) {
			return null;
		}
	}

	static async getFriends(): Promise<IFriend[] | null> {
		try {
			const friends = await apiWithAuth.get<IFriend[]>(this.pathFriends);

			return friends.data;
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

	static async getMyFiles(): Promise<IFile[]> {
		try {
			const files = await apiWithAuth.get<IFile[]>(`${this.pathExchanger}/files/my`);

			return files.data;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	static async downloadFile(file_id: number | string): Promise<IDownloadFileWithData | null> {
		try {
			const file = await apiWithAuth.get<ArrayBuffer>(`${this.pathExchanger}/files/${file_id}`, {
				responseType: "arraybuffer",
			});

			let fileName: string | undefined = file.headers["content-disposition"];
			const fileType: string | undefined = file.headers["content-type"];

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

export default UserService;
