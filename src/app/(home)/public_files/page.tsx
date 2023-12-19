import styles from "./page.module.scss";
import PublicFilesList from "@/components/files/PublicFiles/PublicFilesList";
import type { NextPage } from "next";

const PublicFiles: NextPage = () => {
	return (
		<div className={styles.accessible_files}>
			<h1 className={styles.title}>Публичные файлы</h1>
			<PublicFilesList />
		</div>
	);
};

export default PublicFiles;
