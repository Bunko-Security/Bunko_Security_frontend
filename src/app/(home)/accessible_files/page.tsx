import styles from "./page.module.scss";
import DownloadFiles from "@/components/DownloadFiles/DownloadFiles";
import { NextPage } from "next";

const AccessibleFiles: NextPage = () => {
	return (
		<div className={styles.accessible_files}>
			<h1 className={styles.title}>Доступные файлы для скачивания</h1>
			<DownloadFiles />
		</div>
	);
};

export default AccessibleFiles;
