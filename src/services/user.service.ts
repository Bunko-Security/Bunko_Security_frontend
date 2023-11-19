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
import { LOCAL_STORAGE } from "@/utils/keysName";

// TODO: Подумать об обработке ошибок

class UserService {
	private static pathAuth = "/auth";
	private static pathProfile = "/profile";

	//TODO: Доделать получение аватара и загрузку его
	static async getUser(): Promise<IUser | null> {
		try {
			const user = await apiWithAuth.get<IUser>(this.pathProfile);

			// !WARNING: На время починки ссылки на бэкэнде
			if (user.data.avatar) {
				user.data.avatar = `${process.env.SERVER_URL}/profile/${user.data.avatar}`;
			}

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
			await apiWithAuth.post<IToken>(`${this.pathAuth}/login`, user);
			const gottenUser = await this.getUser();
			localStorage.setItem(LOCAL_STORAGE.IS_LOGIN, "true");

			return gottenUser;
		} catch (e) {
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
	static async updateUser(updateUser: IUpdateUser) {
		await apiWithAuth.put(`${this.pathProfile}/username`, updateUser);
		const user = await this.getUser();

		return user;
	}

	// static async getAvatar(): Promise<IAvatarUser | null> {
	// 	try {
	// 		const avatar = await apiWithAuth.get<IAvatarUser>(`${this.pathProfile}/avatar`);

	// 		return avatar.data;
	// 	} catch (e) {
	// 		return null;
	// 	}
	// }

	/**
	 * TODO: Подумать над тем, как именно получать новый аватар
	 * TODO: Через getUser() или getAvatar()
	 */
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
