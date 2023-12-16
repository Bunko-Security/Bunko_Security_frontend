"use client";

import useSWR from "swr";
import Friends from "@/services/friends.service";
import EmployeeInfo from "../EmployeeInfo/EmployeeInfo";
import PeopleListWithSearchHOC from "../PeopleListWithSearchHOC";
import { type FC } from "react";
import { KEYS_SWR } from "@/utils/keysSWR";

const fetcher = async () => {
	const friends = await Friends.getFriends();

	return friends;
};

const EmployeesList: FC = () => {
	const { data, isLoading, error } = useSWR(KEYS_SWR.FRIENDS, fetcher);

	const onClickList = () => {};

	const PeopleList = PeopleListWithSearchHOC(EmployeeInfo, data!, isLoading);

	return <PeopleList />;
};

export default EmployeesList;
