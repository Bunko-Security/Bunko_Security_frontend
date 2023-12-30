"use client";

import Cookies from "js-cookie";
import UserService from "@/services/user.service";
import useUserStore from "@/stores/useUserStore.store";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { COOKIES, LOCAL_STORAGE } from "@/utils/keysName";
import { type FC, useEffect, useRef } from "react";

// * Инициализация пользователя в Zustand

const UserStoreInitial: FC = () => {
	const router = useRouter();
	const firstRender = useRef<boolean>(false);

	useEffect(() => {
		// ? Может переделать в отдельную функцию в useUserStore?

		const getUser = async () => {
			useUserStore.setState({ isLoading: true });
			const user = await UserService.getUserWithRefreshToken();

			if (!user) {
				router.replace(ROUTES.LOGIN);
				return;
			}

			localStorage.setItem(LOCAL_STORAGE.IS_LOGIN, "true");
			useUserStore.setState({ isLoading: false });
			useUserStore.setState({ user });
		};

		if (!firstRender.current) {
			if (localStorage.getItem(LOCAL_STORAGE.IS_LOGIN) || Cookies.get(COOKIES.ACCESS_TOKEN)) {
				getUser().then(() => {
					firstRender.current = true;
				});
			}
		}
	}, []);

	return null;
};

export default UserStoreInitial;
