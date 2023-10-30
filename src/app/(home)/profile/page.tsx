import styles from "./page.module.scss";
import { NextPage } from "next";

const Profile: NextPage = () => {
	return (
			<div className={styles.profile}>
        <h1 className={styles.title}>Мой профиль</h1>
      </div>
	);
};

export default Profile;
