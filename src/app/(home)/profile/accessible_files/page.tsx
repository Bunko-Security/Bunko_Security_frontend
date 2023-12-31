import styles from "./page.module.scss";
import AccessibleFilesList from "@/components/files/AccessibleFiles/AccessibleFilesList";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Доступные файлы | Bunko Security",
};

const AccessibleFilesPage: NextPage = () => {
	return (
		<div className={styles.accessible_files}>
			<h1 className={styles.title}>Доступные файлы</h1>
			<div className={styles.accessible_files_wrapper}>
				<AccessibleFilesList />
			</div>
		</div>
	);
};

export default AccessibleFilesPage;
