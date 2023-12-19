import axios from "axios";
import apiWithAuth from "@/configs/axios/axios.config";
import { AuthModule } from "@/utils/encrypt/auth.module";
import { LOCAL_STORAGE } from "@/utils/keysName";
import type { ILoginUser, IToken, IUpdateUser, IUser } from "@/models/user.model";

// TODO: Подумать об обработке ошибок
class UserService {
	private static pathAuth = "/auth";
	private static pathProfile = "/profile";

	static async getUser(): Promise<IUser | null> {
		try {
			const user = await apiWithAuth.get<IUser>(this.pathProfile);

			return user.data;
		} catch (e) {
			return null;
		}
	}

	static async login(user: ILoginUser): Promise<IUser | null> {
		try {
			const keyHash = await apiWithAuth.get<{ hash_key: string }>(`${this.pathAuth}/hash_key`, {
				params: { login: user.login },
			});

			const { hashEncrypt, hashAuth } = AuthModule.recreateHash(
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

	static async updateUser(updateUser: IUpdateUser): Promise<IUser | null> {
		try {
			await apiWithAuth.put(`${this.pathProfile}/username`, updateUser);
			const user = await this.getUser();

			return user;
		} catch (e) {
			console.log(e);
			return null;
		}
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
}

export default UserService;
