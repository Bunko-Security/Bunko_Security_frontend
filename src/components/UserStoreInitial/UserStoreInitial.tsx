"use client";

import UserService from "@/services/user.service";
import useUserStore from "@/stores/useUserStore.store";
import { LOCAL_STORAGE } from "@/utils/keysName";
import { FC, useEffect, useRef } from "react";

// * Инициализация пользователя в Zustand

const UserStoreInitial: FC = () => {
	const firstRender = useRef<boolean>(false);

	useEffect(() => {
		// ? Может переделать в отдельную функцию в useUserStore?

		const getUser = async () => {
			useUserStore.setState({ isLoading: true });
			const user = await UserService.getUserWithRefreshToken();
			useUserStore.setState({ user });
			useUserStore.setState({ isLoading: false });
		};

		if (!firstRender.current && localStorage.getItem(LOCAL_STORAGE.IS_LOGIN)) {
			getUser();
			firstRender.current = true;
		}
	}, []);

	return null;
};

export default UserStoreInitial;
