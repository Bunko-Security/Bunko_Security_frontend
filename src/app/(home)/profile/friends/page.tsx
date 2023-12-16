import styles from "./page.module.scss";
import EmployeesList from "@/components/friends/EmployeesList/EmployeesList";
import FriendsList from "@/components/friends/FriendsList/FriendsList";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Мои друзья | Bunko Security",
};

const Friends: NextPage = () => {
	return (
		<div className={styles.friends}>
			<h1 className={styles.title}>Мои друзья</h1>
			<div className={styles.wrapper}>
				<div className={styles.wrapper_people}>
					<h2>Добавить в друзья</h2>
					<EmployeesList />
				</div>
				<div className={styles.wrapper_friends}>
					<h2>В друзьях</h2>
					<FriendsList />
				</div>
			</div>
		</div>
	);
};

export default Friends;
