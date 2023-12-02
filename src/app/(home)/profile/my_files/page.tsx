import styles from "./page.module.scss";
import UploadFile from "@/components/files/UploadFile/UploadFile";
import MyFilesList from "@/components/files/MyFiles/MyFilesList";
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
					<MyFilesList />
				</div>

				<div className={styles.import_my_files}>
					<UploadFile />
				</div>
			</div>
		</div>
	);
};

export default MyFiles;
