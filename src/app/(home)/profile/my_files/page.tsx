import styles from "./page.module.scss";
import ImportFiles from "@/components/files/ImportFiles/ImportFiles";
import MyDownloadFiles from "@/components/files/MyFiles/MyDownloadFiles";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Мои файлы | Bunko Security",
};

const MyFiles: NextPage = () => {
	return (
		<div className={styles.my_files}>
			<h1 className={styles.title}>Мои файлы</h1>
			<div className={styles.my_files_wrapper}>
				<div className={styles.list_my_files}>
					<MyDownloadFiles />
				</div>

				<div className={styles.import_my_files}>
					<ImportFiles />
				</div>
			</div>
		</div>
	);
};

export default MyFiles;
