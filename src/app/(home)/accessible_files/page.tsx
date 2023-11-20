import styles from "./page.module.scss";
import AccessibleFilesList from "@/components/files/AccessibleFiles/AccessibleFilesList";
import type { NextPage } from "next";

const AccessibleFiles: NextPage = () => {
	return (
		<div className={styles.accessible_files}>
			<h1 className={styles.title}>Доступные файлы для скачивания</h1>
			<AccessibleFilesList />
		</div>
	);
};

export default AccessibleFiles;
