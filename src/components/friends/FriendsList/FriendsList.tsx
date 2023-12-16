"use client";

import useSWR from "swr";
import Friends from "@/services/friends.service";
import FriendInfo from "../FriendInfo/FriendInfo";
import PeopleListWithSearchHOC from "../PeopleListWithSearchHOC";
import { type FC } from "react";
import { KEYS_SWR } from "@/utils/keysSWR";

const fetcher = async () => {
	const friends = await Friends.getFriends();

	return friends;
};

const FriendsList: FC = () => {
	const { data, isLoading, error } = useSWR(KEYS_SWR.FRIENDS, fetcher);

	const onClickList = () => {};

	const PeopleList = PeopleListWithSearchHOC(FriendInfo, data!, isLoading);

	return <PeopleList />;
};

export default FriendsList;
