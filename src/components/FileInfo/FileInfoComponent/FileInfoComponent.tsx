"use client";

import styles from "./FileInfoComponent.module.scss";
import IconForward from "/public/icon-forward.svg";
import IconDownload from "/public/icon-download.svg";
import { FC } from "react";

interface FileInfoComponentProps {
	fileName: string;
	fileAdd: string;
	fileDate: string;
}

const FileInfoComponent: FC<FileInfoComponentProps> = ({ fileAdd, fileName, fileDate }) => {
	const handleForward = () => {};
	const handleDownload = () => {};

	return (
		<div className={styles.file}>
			<p className={styles.file_name}>{fileName}</p>
			<p className={styles.file_add}>{fileAdd}</p>
			<p className={styles.file_date}>{fileDate}</p>
			<div className={styles.file_icons}>
				<IconForward
					className={styles.icon_forward}
					onClick={handleForward}
				/>
				<IconDownload
					className={styles.icon_download}
					onClick={handleDownload}
				/>
			</div>
		</div>
	);
};

export default FileInfoComponent;
