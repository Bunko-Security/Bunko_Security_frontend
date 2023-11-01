"use client";

import styles from "./MyDownloadFiles.module.scss";
import InputSearch from "../../forms/InputSearch/InputSearch";
import IconEmptyFiles from "/public/icon-empty.svg";
import MyFileInfoList from "./MyFileInfoList/MyFileInfoList";
import { FC, useState } from "react";

const MyDownloadFiles: FC = () => {
	const [count, setCount] = useState<number>(20);

	return (
		<>
			{count ? (
				<>
					<InputSearch
						placeholder="Имя файла"
						marginBottom={25}
					/>
					<MyFileInfoList count={count} />
				</>
			) : (
				<div className={styles.empty}>
					<p>Нет файлов для скачивания</p>
					<IconEmptyFiles className={styles.icon_empty} />
				</div>
			)}
		</>
	);
};

export default MyDownloadFiles;
