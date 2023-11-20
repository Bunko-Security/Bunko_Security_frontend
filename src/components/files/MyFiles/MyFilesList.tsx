"use client";

import styles from "./MyFilesList.module.scss";
import IconEmptyFiles from "/public/icon-empty.svg";
import ListWithSearchHOC from "../ListWithSearchHOC";
import MyFileInfoComponent from "./MyFilesInfo/MyFilesInfo";
import { type FC, useState } from "react";

const file = {
	name: "Имя файла",
	date: "12:03 10.09.2023",
};

// !WARNING: Может быть удалён, если файлы будут передаваться на уровень выше

const MyFilesList: FC = () => {
	const [count, setCount] = useState<number>(20);

	const FilesList = ListWithSearchHOC(count, MyFileInfoComponent);

	return (
		<>
			{count ? (
				<FilesList file={file} />
			) : (
				<div className={styles.empty}>
					<p>Нет файлов для скачивания</p>
					<IconEmptyFiles className={styles.icon_empty} />
				</div>
			)}
		</>
	);
};

export default MyFilesList;
