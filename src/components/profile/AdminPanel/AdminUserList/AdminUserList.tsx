"use client";

import useSWR from "swr";
import AdminService from "@/services/admin.service";
import AdminUserInfo from "../AdminUserInfo/AdminUserInfo";
import ListWithSearch from "@/components/List/ListWithSearch";
import { KEYS_SWR } from "@/utils/keysSWR";
import type { FormValuesSearch } from "@/components/forms/formItems/InputSearch/InputSearch";
import { type FC, type MouseEventHandler, useState } from "react";

const fetcher = async (search: string) => {
	const users = await AdminService.getUsers({ name_like: search });

	return users || [];
};

const AdminUserList: FC = () => {
	const [search, setSearch] = useState<string>("");
	const {
		data: users = [],
		isLoading,
		mutate,
	} = useSWR([KEYS_SWR.USERS, search], ([_, search]) => fetcher(search));

	const onClickList: MouseEventHandler<HTMLDivElement> = async (e) => {
		const event = e.target as HTMLElement;

		if (event.tagName === "svg") {
			const mainParent = event.parentElement!;
			await AdminService.deleteUser(mainParent.childNodes[0].textContent!);
			mutate();
		}

		if (event.tagName === "path") {
			const mainParent = event.parentElement!.parentElement!;
			await AdminService.deleteUser(mainParent.childNodes[0].textContent!);
			mutate();
		}
	};

	const handlerSubmitSearch = (values: FormValuesSearch) => {
		setSearch(values.name_like);
	};

	return (
		<ListWithSearch
			items={users}
			isLoading={isLoading}
			submitSearchFile={handlerSubmitSearch}
			fnClickList={onClickList}
			placeholder="Имя друга"
			textEmpty="Нет друзей"
		>
			{users.map((user) => (
				<AdminUserInfo
					key={user.login}
					user={user}
				/>
			))}
		</ListWithSearch>
	);
};

export default AdminUserList;
