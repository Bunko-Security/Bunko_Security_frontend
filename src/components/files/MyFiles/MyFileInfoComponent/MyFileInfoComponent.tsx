"use client";

import styles from "./MyFileInfoComponent.module.scss";
import IconDownload from "/public/icon-download.svg";
import { CSSProperties, FC } from "react";

interface MyFileInfoComponent {
	file: {
		name: string;
		date: string;
	};
	style?: CSSProperties;
}

const FileInfoComponent: FC<MyFileInfoComponent> = ({ file, style }) => {
	const handleDownload = () => {};

	return (
		<div
			className={styles.file}
			style={style}
		>
			<p className={styles.file_name}>{file.name}</p>
			<p className={styles.file_date}>{file.date}</p>
			<IconDownload
				className={styles.icon_download}
				onClick={handleDownload}
			/>
		</div>
	);
};

export default FileInfoComponent;
