"use client";

import styles from "./AdminUserInfo.module.scss";
import IconDelete from "/public/icon-close.svg";
import type { IUser } from "@/models/user.model";
import type { CSSProperties, FC } from "react";

interface AdminUserInfoProps {
	user: IUser;
	style?: CSSProperties;
}

const AdminUserInfo: FC<AdminUserInfoProps> = ({ user, style }) => {
	return (
		<div
			className={styles.user}
			style={{ ...(user.is_admin && { border: "solid 2px yellow" }), ...style }}
			data-file-id={user.login}
		>
			<p className={styles.user_login}>{user.login}</p>
			<p className={styles.user_username}>{user.username}</p>
			<IconDelete className={styles.icon_delete} />
		</div>
	);
};

export default AdminUserInfo;
