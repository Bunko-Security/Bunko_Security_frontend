"use client";

import ListWithSearch from "@/components/List/ListWithSearch";
import FriendInfo from "../FriendInfo/FriendInfo";
import CoworkersService from "@/services/coworkers.service";
import { KEYS_SWR } from "@/utils/keysSWR";
import { FormValuesSearch } from "@/components/forms/formItems/InputSearch/InputSearch";
import useSWR, { mutate as mutateGlobal } from "swr";
import { type FC, type MouseEventHandler, useState } from "react";

const fetcher = async (search: string) => {
	const friends = await CoworkersService.getFriends({ name_like: search });

	return friends;
};

const FriendsList: FC = () => {
	const [search, setSearch] = useState<string>("");
	const {
		data: friends = [],
		isLoading,
		isValidating,
		mutate,
	} = useSWR([KEYS_SWR.FRIENDS, search], ([_, search]) => fetcher(search), {
		revalidateOnFocus: false,
	});

	const onClickList: MouseEventHandler<HTMLDivElement> = async (e) => {
		const event = e.target as HTMLElement;

		if (event.tagName === "svg") {
			const mainParent = event.parentElement!;
			await CoworkersService.deleteFriend(mainParent.childNodes[0].textContent!);
			mutate();
			mutateGlobal([KEYS_SWR.EMPLOYEES, ""]);
		}

		if (event.tagName === "path") {
			const mainParent = event.parentElement!.parentElement!;
			await CoworkersService.deleteFriend(mainParent.childNodes[0].textContent!);
			mutate();
			mutateGlobal([KEYS_SWR.EMPLOYEES, ""]);
		}
	};

	const handlerSubmitSearch = (values: FormValuesSearch) => {
		if (search !== values.name_like) {
			setSearch(values.name_like);
		} else {
			mutate();
		}
	};

	return (
		<ListWithSearch
			items={friends}
			isLoading={isLoading ? isLoading : isValidating}
			submitSearchFile={handlerSubmitSearch}
			fnClickList={onClickList}
			placeholder="Имя друга"
			textEmpty="Нет друзей"
		>
			{friends.map((friend) => (
				<FriendInfo
					key={friend.login}
					person={friend}
				/>
			))}
		</ListWithSearch>
	);
};

export default FriendsList;
