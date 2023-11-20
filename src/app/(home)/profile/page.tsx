import styles from "./page.module.scss";
import ImportAvatar from "@/components/profile/ImportAvatar/ImportAvatar";
import FormChangeInfoUser from "@/components/forms/FormChangeInfoUser/FormChangeInfoUser";
import type { NextPage } from "next";

const Profile: NextPage = () => {
	return (
		<div className={styles.profile}>
			<h1 className={styles.title}>Мой профиль</h1>
			<div className={styles.settings}>
				<div className={styles.form}>
					<FormChangeInfoUser />
				</div>
				<div className={styles.preview}>
					<h3 className={styles.preview_title}>Аватар профиля</h3>
					<ImportAvatar />
				</div>
			</div>
		</div>
	);
};

export default Profile;
