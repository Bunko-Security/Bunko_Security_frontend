import styles from "./page.module.scss";
import FormChangeInfoUser from "@/components/forms/FormChangeInfoUser/FormChangeInfoUser";
import ChangeAvatar from "@/components/profile/ChangeAvatar/ChangeAvatar";
import { NextPage } from "next";

const Profile: NextPage = () => {
	return (
		<div className={styles.profile}>
			<h1 className={styles.title}>Мой профиль</h1>
			<div className={styles.settings}>
				<div className={styles.form}>
					<FormChangeInfoUser />
				</div>
				<div className={styles.preview}>
					<ChangeAvatar />
				</div>
			</div>
		</div>
	);
};

export default Profile;
