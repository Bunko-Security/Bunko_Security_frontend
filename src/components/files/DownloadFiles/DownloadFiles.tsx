"use client";

import styles from "./DownloadFiles.module.scss";
import InputSearch from "../../forms/InputSearch/InputSearch";
import FileInfoList from "../FileInfoList/FileInfoList";
import IconEmptyFiles from "/public/icon-empty.svg";
import { FC, useState } from "react";

const DownloadFiles: FC = () => {
	const [count, setCount] = useState<number>(20);

	return (
		<>
			{count ? (
				<>
					<InputSearch
						placeholder="Имя файла"
						marginBottom={25}
					/>
					<FileInfoList count={count} />
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

export default DownloadFiles;
