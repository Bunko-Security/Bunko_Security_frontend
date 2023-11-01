import styles from "./FileInfoList.module.scss";
import FileInfoComponent from "../FileInfoComponent/FileInfoComponent";
import { FC } from "react";

interface FileInfoListProps {
	count: number;
}

const file = {
	name: "Имя файла",
	byUser: "Петров И.В.",
	date: "12:03 10.09.2023",
};

const FileInfoList: FC<FileInfoListProps> = ({ count }) => {
	return (
		<div className={styles.files}>
			{Array.from({ length: count }).map((_, i) => (
				<FileInfoComponent
					key={i}
					file={file}
					style={{ marginRight: 15 }}
				/>
			))}
		</div>
	);
};

export default FileInfoList;
