import apiWithAuth from "@/configs/axios/axios.config";
import type { IFriend } from "@/models/friend.model";

class Friends {
	private static pathDefault = "/friends";

	static async getFriends(): Promise<IFriend[] | null> {
		try {
			const friends = await apiWithAuth.get<IFriend[]>(this.pathDefault);

			return friends.data;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default Friends;
