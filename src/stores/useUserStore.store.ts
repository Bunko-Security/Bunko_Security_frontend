import UserService from "@/services/user.service";
import { shallow } from "zustand/shallow";
import { devtools } from "zustand/middleware";
import { NAME_STORES } from "@/stores/nameStores";
import { createWithEqualityFn } from "zustand/traditional";
import { ICreateUser, ILoginUser, IUser } from "@/models/user.model";

// * Конфигурация хранилища пользователя сайта

type UserStore = {
	user: IUser | null;
	isLoading: boolean;
	registerUser: (user: ICreateUser) => void;
	loginUser: (user: ILoginUser) => void;
	// updateUser: (user: IUpdateUser) => void;
	logout: () => void;
};

const useUserStore = createWithEqualityFn<UserStore>()(
	devtools(
		(set, get) => ({
			user: null,
			isLoading: false,
			registerUser: async (user) => {
				const newUser = await UserService.register(user);
				if (typeof newUser === "object") {
					set({ user: newUser }, false, "register");
				}
			},
			loginUser: async (user) => {
				const loginUser = await UserService.login(user);
				if (typeof loginUser === "object") {
					set({ user: loginUser }, false, "login");
				}
			},
			// updateUser: async (updateUser) => {
			// 	if (!get().user) {
			// 		return;
			// 	}

			// 	let key: keyof IUpdateUser;
			// 	const copyUser = { ...updateUser };

			// 	for (key in copyUser) {
			// 		if (!copyUser[key]) {
			// 			copyUser[key] = get().user![key];
			// 		}
			// 	}

			// 	const newUser = await UserService.update(get().user!.id, copyUser);
			// 	set({ user: newUser }, false, "updateUser");
			// },
			logout: () => {
				set({ user: null }, false, "logout");
			},
		}),
		{
			name: NAME_STORES.USER,
		},
	),
	shallow,
);

export default useUserStore;
