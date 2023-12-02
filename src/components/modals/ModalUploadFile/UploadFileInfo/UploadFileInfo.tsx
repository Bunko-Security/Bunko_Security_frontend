"use client";

import styles from "./UploadFileInfo.module.scss";
// import IconDownload from "/public/icon-download.svg";
import type { CSSProperties, FC } from "react";

interface MyFilesInfoProps {
	fileName: string;
	style?: CSSProperties;
}

const UploadFileInfo: FC<MyFilesInfoProps> = ({ fileName, style }) => {
	const handleDownload = () => {};

	return (
		<div
			className={styles.file}
			style={style}
		>
			<p className={styles.file_name}>{fileName}</p>
			{/* <IconDownload
				className={styles.icon_download}
				onClick={handleDownload}
			/> */}
		</div>
	);
};

export default UploadFileInfo;
