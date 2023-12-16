"use client";

import styles from "./FriendInfo.module.scss";
import IconDelete from "/public/icon-close.svg";
import type { IFriend } from "@/models/friend.model";
import type { CSSProperties, FC } from "react";

interface FriendInfoProps {
	person: IFriend;
	style?: CSSProperties;
}

const FriendInfo: FC<FriendInfoProps> = ({ person, style }) => {
	return (
		<div
			className={styles.friend}
			style={style}
			data-file-id={person.login}
		>
			<p className={styles.friend_login}>{person.login}</p>
			<p className={styles.friend_username}>{person.username}</p>
			<IconDelete className={styles.icon_delete} />
		</div>
	);
};

export default FriendInfo;
