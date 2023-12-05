"use client";

import styles from "./MyFilesInfo.module.scss";
import IconDownload from "/public/icon-download.svg";
import type { IFile } from "@/models/file.model";
import type { CSSProperties, FC } from "react";

interface MyFilesInfoProps {
	file: IFile;
	style?: CSSProperties;
}

const MyFilesInfo: FC<MyFilesInfoProps> = ({ file, style }) => {
	return (
		<div
			className={styles.file}
			style={style}
			data-file-id={file.file_id}
		>
			<p className={styles.file_name}>{file.filename}</p>
			<p className={styles.file_date}>{file.delete_date}</p>
			<IconDownload className={styles.icon_download} />
		</div>
	);
};

export default MyFilesInfo;
