"use client";

import styles from "./MyFilesInfo.module.scss";
import IconDelete from "/public/icon-close.svg";
import IconDownload from "/public/icon-download.svg";
import type { IMyFile } from "@/models/file.model";
import type { CSSProperties, FC } from "react";

interface MyFilesInfoProps {
	file: IMyFile;
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
			<div className={styles.buttons}>
				<IconDelete
					className={styles.icon_delete}
					data-action="delete"
				/>
				<IconDownload
					className={styles.icon_download}
					data-action="download"
				/>
			</div>
		</div>
	);
};

export default MyFilesInfo;
