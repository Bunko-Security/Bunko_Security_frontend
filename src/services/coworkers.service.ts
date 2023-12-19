import apiWithAuth from "@/configs/axios/axios.config";
import type { IFriend } from "@/models/friend.model";
import type { IParamsSearch } from "@/models/params.model";

class CoworkersService {
	private static pathDefault = "/coworkers";

	static async getFriends(params?: IParamsSearch): Promise<IFriend[]> {
		try {
			const friends = await apiWithAuth.get<IFriend[]>(`${this.pathDefault}/favorite`, { params });

			return friends.data;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	static async getEmployees(params?: IParamsSearch): Promise<IFriend[]> {
		try {
			const employees = await apiWithAuth.get<IFriend[]>(`${this.pathDefault}/other`, { params });

			return employees.data;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	static async addFriend(login: string): Promise<undefined | null> {
		try {
			await apiWithAuth.post<string>(`${this.pathDefault}/favorite`, { login });
		} catch (e) {
			console.log(e);
			return null;
		}
	}
	static async deleteFriend(login: string): Promise<undefined | null> {
		try {
			console.log(login);
			await apiWithAuth.delete<string>(`${this.pathDefault}/${login}`);
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default CoworkersService;
