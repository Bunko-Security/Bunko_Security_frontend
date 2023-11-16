import axios from "axios";
import apiWithAuth from "@/configs/axios/axios.config";
import {
	IAvatarUser,
	IBaseUser,
	ICreateUser,
	ILoginUser,
	IToken,
	IUser,
} from "@/models/user.model";

class UserService {
	private static pathAuth = "/auth";

	//TODO: Добавить try/catch
	static async register(user: ICreateUser): Promise<IUser | boolean> {
		const token = await apiWithAuth.post<IToken>(`${this.pathAuth}/register`, user);

		if (token.data) {
			const user = await apiWithAuth.get<IUser>("/profile");
			return user.data;
		}

		return false;
	}

	//TODO: Добавить try/catch
	static async login(user: ILoginUser): Promise<IUser | boolean> {
		const token = await apiWithAuth.post<IToken>(`${this.pathAuth}/login`, user);

		if (token.data) {
			const user = await apiWithAuth.get<IUser>("/profile");
			return user.data;
		}

		return false;
	}


  //TODO: Доделать получение аватара и загрузку его
	static async getUser(): Promise<IUser | null> {
		try {
			const userBase = await apiWithAuth.get<IBaseUser>("/profile");
			const userAvatar = await apiWithAuth.get<IAvatarUser>("/profile/avatar");

      console.log(userAvatar.data)

			const user = { ...userBase.data, ...userAvatar.data };

			console.log(user);

			return user;
		} catch (e) {
			return null;
		}
	}

	static async getAvatar(): Promise<IAvatarUser | null> {
		try {
			const avatar = await apiWithAuth.get<IAvatarUser>("/profile/avatar");

			return avatar.data;
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
			return null;
		}
	}

	// static async update(id: number, user: IUpdateUser): Promise<IUser> {
	// 	const newUser = await APIv1.put<IUser>(`${this.pathBase}/${id}`, user);

	// 	return newUser.data;
	// }
}

export default UserService;
