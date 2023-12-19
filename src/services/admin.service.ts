import apiWithAuth from "@/configs/axios/axios.config";
import type { IParamsSearch } from "@/models/params.model";
import type { ICreateUser, IUser } from "@/models/user.model";

class AdminService {
	private static pathUsers = "/users";

	static async registerUser(user: ICreateUser): Promise<undefined | null> {
		try {
			await apiWithAuth.post<string>(this.pathUsers, user);
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async getUsers(params?: IParamsSearch): Promise<IUser[]> {
		try {
			const users = await apiWithAuth.get<IUser[]>(this.pathUsers, {
				params: { name_like: params?.name_like },
			});

			return users.data;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	static async deleteUser(login: string): Promise<undefined | null> {
		try {
			await apiWithAuth.delete<string>(`${this.pathUsers}/${login}`);
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default AdminService;
