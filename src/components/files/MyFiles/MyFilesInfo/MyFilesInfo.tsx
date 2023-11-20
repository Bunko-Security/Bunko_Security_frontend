"use client";

import styles from "./MyFilesInfo.module.scss";
import IconDownload from "/public/icon-download.svg";
import type { CSSProperties, FC } from "react";

interface MyFilesInfoProps {
	file: {
		name: string;
		date: string;
	};
	style?: CSSProperties;
}

const MyFilesInfo: FC<MyFilesInfoProps> = ({ file, style }) => {
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

export default MyFilesInfo;
