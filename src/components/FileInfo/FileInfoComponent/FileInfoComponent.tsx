"use client";

import styles from "./FileInfoComponent.module.scss";
import IconForward from "/public/icon-forward.svg";
import PortalModals from "@/components/PortalModals/PortalModals";
import IconDownload from "/public/icon-download.svg";
import ModalForwardFile from "@/components/modals/ModalForwardFile/ModalForwardFile";
import { CSSProperties, FC, useState } from "react";

interface FileInfoComponentProps {
	fileName: string;
	fileAdd: string;
	fileDate: string;
	style?: CSSProperties;
}

const FileInfoComponent: FC<FileInfoComponentProps> = ({ fileAdd, fileName, fileDate, style }) => {
	const [openForward, setOpenForward] = useState<boolean>(false);

	const handleForward = () => {
		setOpenForward(true);
	};

	const handleDownload = () => {};

	return (
		<div
			className={styles.file}
			style={style}
		>
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

			<PortalModals isOpen={openForward}>
				<ModalForwardFile onClose={() => setOpenForward(false)} />
			</PortalModals>
		</div>
	);
};

export default FileInfoComponent;
