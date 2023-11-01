"use client";

import styles from "./FileInfoComponent.module.scss";
import IconForward from "/public/icon-forward.svg";
import IconDownload from "/public/icon-download.svg";
import PortalModals from "@/components/modals/PortalModals/PortalModals";
import ModalForwardFile from "@/components/modals/ModalForwardFile/ModalForwardFile";
import { CSSProperties, FC, useState } from "react";

interface FileInfoComponentProps {
	file: {
		name: string;
		byUser: string;
		date: string;
	};
	style?: CSSProperties;
}

const FileInfoComponent: FC<FileInfoComponentProps> = ({ file, style }) => {
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
			<p className={styles.file_name}>{file.name}</p>
			<p className={styles.file_add}>{file.byUser}</p>
			<p className={styles.file_date}>{file.date}</p>
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
