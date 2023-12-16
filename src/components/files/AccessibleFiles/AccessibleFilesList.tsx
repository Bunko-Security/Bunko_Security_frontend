"use client";

import styles from "./AccessibleFilesList.module.scss";
import IconEmptyFiles from "/public/icon-empty.svg";
import PublicFileInfo from "../PublicFiles/PublicFilesInfo/PublicFileInfo";
import FilesListWithSearchHOC from "../FilesListWithSearchHOC";
import { type FC, useState } from "react";

const files = [
	{
		name: "Имя файла",
		byUser: "Петров И.В.",
		date: "12:03 10.09.2023",
	},
];

// !WARNING: Может быть удалён, если файлы будут передаваться на уровень выше

const AccessibleFilesList: FC = () => {
	const [count, setCount] = useState<number>(20);

	const FilesList = FilesListWithSearchHOC(PublicFileInfo, files);

	return (
		<>
			{count ? (
				<FilesList />
			) : (
				<div className={styles.empty}>
					<p>Нет файлов для скачивания</p>
					<IconEmptyFiles className={styles.icon_empty} />
				</div>
			)}
		</>
	);
};

export default AccessibleFilesList;
