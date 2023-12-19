import styles from "./page.module.scss";
import AdminPanel from "@/components/profile/AdminPanel/AdminPanel";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Панель администратора | Bunko Security",
};

const AdminPage: NextPage = () => {
	return (
		<div className={styles.admin_panel}>
			<h1 className={styles.title}>Админ панель</h1>
			<AdminPanel />
		</div>
	);
};

export default AdminPage;
