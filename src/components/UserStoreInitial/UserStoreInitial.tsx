"use client";

import Cookies from "js-cookie";
import UserService from "@/services/user.service";
import useUserStore from "@/stores/useUserStore.store";
import { COOKIES } from "@/utils/keysName";
import { FC, useEffect, useRef } from "react";

// * Инициализация пользователя в Zustand
const UserStoreInitial: FC = () => {
	const firstRender = useRef<boolean>(false);

	useEffect(() => {
		const getUser = async () => {
			useUserStore.setState({ isLoading: true });
			const user = await UserService.getUserWithRefreshToken();
			useUserStore.setState({ user });
			useUserStore.setState({ isLoading: false });
		};

		if (!firstRender.current && Cookies.get(COOKIES.REFRESH_TOKEN)) {
			getUser();
			firstRender.current = true;
		}
	}, []);

	return null;
};

export default UserStoreInitial;
