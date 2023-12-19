import styles from "./UploadFileInfo.module.scss";
import type { CSSProperties, FC } from "react";

interface UploadFileInfoProps {
	fileName: string;
	style?: CSSProperties;
}

const UploadFileInfo: FC<UploadFileInfoProps> = ({ fileName, style }) => {
	return (
		<div
			className={styles.file}
			style={style}
		>
			<p className={styles.file_name}>{fileName}</p>
		</div>
	);
};

export default UploadFileInfo;
