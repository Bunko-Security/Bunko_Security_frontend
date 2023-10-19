import styles from "./page.module.scss";
import InputSearch from "@/components/forms/InputSearch/InputSearch";
import IconForward from "/public/icon-forward.svg";
import IconDownload from "/public/icon-download.svg";
import { NextPage } from "next";

const AccessibleFiles: NextPage = () => {
	return (
		<div className={styles.accessible_files}>
			<h1 className={styles.title}>Доступные файлы для скачивания</h1>
			<InputSearch
				placeholder="Имя файла"
				marginBottom={25}
			/>
			<div className={styles.files}>
				<div className={styles.file}> 
					<p className={styles.file_name}>Имя файла</p>
					<p className={styles.file_add}>Петров В.И.</p>
					<p className={styles.file_date}>12:01 27.09.2023</p>
					<div className={styles.file_icons}>
						<IconForward className={styles.icon_forward} />
						<IconDownload className={styles.icon_download} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccessibleFiles;
