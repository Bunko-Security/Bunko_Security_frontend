import UserService from "@/services/user.service";
import { shallow } from "zustand/shallow";
import { devtools } from "zustand/middleware";
import { NAME_STORES } from "@/stores/nameStores";
import { createWithEqualityFn } from "zustand/traditional";
import type { ILoginUser, IUpdateUser, IUser } from "@/models/user.model";

// * Конфигурация хранилища пользователя сайта

type UserStore = {
	user: IUser | null;
	isLoading: boolean;
	loginUser: (user: ILoginUser) => void;
	updateUser: (user: IUpdateUser) => void;
	updateAvatar: (avatar: Blob, nameAvatar?: string) => void;
	logout: () => void;
};

const useUserStore = createWithEqualityFn<UserStore>()(
	devtools(
		(set) => ({
			user: null,
			isLoading: false,
			loginUser: async (user) => {
				const loginUser = await UserService.login(user);
				set({ user: loginUser }, false, "login");
			},
			updateUser: async (updateUser) => {
				const newUser = await UserService.updateUser(updateUser);
				set({ user: newUser }, false, "updateUser");
			},
			updateAvatar: async (avatar, nameAvatar) => {
				set({ isLoading: true });
				const newUser = await UserService.updateAvatar(avatar, nameAvatar);
				set({ user: newUser }, false, "update_avatar");
				set({ isLoading: false });
			},
			logout: async () => {
				const isOk = await UserService.logout();

				if (isOk) {
					set({ user: null }, false, "logout");
				}
			},
		}),
		{
			name: NAME_STORES.USER,
		},
	),
	shallow,
);

export default useUserStore;
