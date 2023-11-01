import styles from "./MyFileInfoList.module.scss";
import MyFileInfoComponent from "../MyFileInfoComponent/MyFileInfoComponent";
import { FC } from "react";

interface FileInfoListProps {
	count: number;
}

const file = {
	name: "Имя файла",
	date: "12:03 10.09.2023",
};

const MyFileInfoList: FC<FileInfoListProps> = ({ count }) => {
	return (
		<div className={styles.files}>
			{Array.from({ length: count }).map((_, i) => (
				<MyFileInfoComponent
					key={i}
					file={file}
					style={{ marginRight: 15 }}
				/>
			))}
		</div>
	);
};

export default MyFileInfoList;
