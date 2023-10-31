"use client";

import styles from "./FileInfoList.module.scss";
import FileInfoComponent from "../FileInfoComponent/FileInfoComponent";
import { FC } from "react";
import { useRef } from "react";

interface FileInfoListProps {
	count: number;
}

const FileInfoList: FC<FileInfoListProps> = ({ count }) => {
	const filesRef = useRef<HTMLDivElement | null>(null);

	return (
		<div
			ref={filesRef}
			className={styles.files}
		>
			{Array.from({ length: count }).map((_, i) => (
				<FileInfoComponent
					key={i}
					fileName="Имя файла"
					fileAdd="Петров И.В."
					fileDate="12:03 10.09.2023"
					style={{ marginRight: 15 }}
				/>
			))}
		</div>
	);
};

export default FileInfoList;
