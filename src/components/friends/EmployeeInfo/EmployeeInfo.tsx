"use client";

import styles from "./EmployeeInfo.module.scss";
import IconPlus from "/public/icon-plus.svg";
import type { IFriend } from "@/models/friend.model";
import type { CSSProperties, FC } from "react";

interface EmployeeInfoProps {
	person: IFriend;
	style?: CSSProperties;
}

const EmployeeInfo: FC<EmployeeInfoProps> = ({ person, style }) => {
	return (
		<div
			className={styles.employee}
			style={style}
			data-file-id={person.login}
		>
			<p className={styles.employee_login}>{person.login}</p>
			<p className={styles.employee_username}>{person.username}</p>
			<IconPlus className={styles.icon_plus} />
		</div>
	);
};

export default EmployeeInfo;
