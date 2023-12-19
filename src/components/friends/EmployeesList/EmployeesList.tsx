"use client";

import ListWithSearch from "@/components/List/ListWithSearch";
import EmployeeInfo from "../EmployeeInfo/EmployeeInfo";
import CoworkersService from "@/services/coworkers.service";
import { KEYS_SWR } from "@/utils/keysSWR";
import { FormValuesSearch } from "@/components/forms/formItems/InputSearch/InputSearch";
import useSWR, { mutate as mutateGlobal } from "swr";
import { useState, type FC, type MouseEventHandler } from "react";

const fetcher = async (search: string) => {
	const friends = await CoworkersService.getEmployees({ name_like: search });

	return friends;
};

const EmployeesList: FC = () => {
	const [search, setSearch] = useState<string>("");
	const {
		data: employees = [],
		isLoading,
		isValidating,
		mutate,
	} = useSWR([KEYS_SWR.EMPLOYEES, search], ([_, search]) => fetcher(search), {
		revalidateOnFocus: false,
	});

	const onClickList: MouseEventHandler<HTMLDivElement> = async (e) => {
		const event = e.target as HTMLElement;

		if (event.tagName === "svg") {
			const mainParent = event.parentElement!;
			await CoworkersService.addFriend(mainParent.childNodes[0].textContent!);
			mutate();
			mutateGlobal([KEYS_SWR.FRIENDS, ""]);
		}

		if (event.tagName === "path") {
			const mainParent = event.parentElement!.parentElement!;
			await CoworkersService.addFriend(mainParent.childNodes[0].textContent!);
			mutate();
			mutateGlobal([KEYS_SWR.FRIENDS, ""]);
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
			items={employees}
			isLoading={isLoading ? isLoading : isValidating}
			submitSearchFile={handlerSubmitSearch}
			fnClickList={onClickList}
			placeholder="Имя сотрудника"
			textEmpty="Нет сотрудников"
		>
			{employees.map((employee) => (
				<EmployeeInfo
					key={employee.login}
					person={employee}
				/>
			))}
		</ListWithSearch>
	);
};

export default EmployeesList;
