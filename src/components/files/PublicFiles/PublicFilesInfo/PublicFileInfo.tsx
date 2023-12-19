import styles from "./PublicFileInfo.module.scss";
import IconDownload from "/public/icon-download.svg";
import type { IOtherFile } from "@/models/file.model";
import { type CSSProperties, type FC } from "react";

interface AccessibleFileInfoProps {
	file: IOtherFile;
	style?: CSSProperties;
}

const PublicFileInfo: FC<AccessibleFileInfoProps> = ({ file, style }) => {
	return (
		<div
			className={styles.file}
			style={style}
			data-file-id={file.file_id}
		>
			<p className={styles.file_name}>{file.filename}</p>
			<p className={styles.file_add}>{file.user_from}</p>
			<p className={styles.file_date}>{file.delete_date}</p>
			<IconDownload className={styles.icon_download} />
		</div>
	);
};

export default PublicFileInfo;
