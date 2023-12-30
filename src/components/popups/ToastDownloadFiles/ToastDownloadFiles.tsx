"use client";

import styles from "./ToastDownloadFiles.module.scss";
import IconClose from "/public/icon-close.svg";
import IconCollapse from "/public/toast/toast-collapse.svg";
import NotificationUploadFile from "../NotificationUploadFile/NotificationUploadFile";
import NotificationDownloadFile from "../NotificationDownloadFile/NotificationDownloadFile";
import { ModalProps } from "@/types/ModalProps.type";
import { IDownloadFileInfo, IUploadFileInfo } from "@/models/file.model";
// import { type FC, useEffect, useRef, useState } from "react";
import { type FC, useEffect, useState } from "react";

type Location<T> = {
	top?: T;
	left?: T;
	right?: T;
	bottom?: T;
};

interface ToastDownloadFilesProps {
	file: IDownloadFileInfo | IUploadFileInfo | null;
	isDownload?: boolean;
	location?: Location<number | string>;
}

const ToastDownloadFiles: FC<ModalProps & ToastDownloadFilesProps> = ({
	file,
	onClose,
	location,
	isDownload = true,
}) => {
	// const firstRender = useRef<boolean>(false);
	const [toast, setToast] = useState<any[]>([]);
	const [isCollapse, setIsCollapse] = useState<boolean>(false);

	useEffect(() => {
		// if (file && firstRender.current) {
		if (file) {
			setToast((items) => [...items, file]);
    }
		// } else {
			// firstRender.current = true;
		// }
	}, [file]);

	return (
		<div
			className={styles.toast}
			style={{ ...(location ?? { bottom: 10, left: 10 }) }}
		>
			<div className={styles.header}>
				<h2>{isDownload ? "Скачивание файла" : "Выгрузка файла"}</h2>
				<div className={styles.buttons}>
					{isCollapse ? (
						<IconCollapse
							className={styles.icon_collapse}
							style={{ transform: "rotate(180deg)" }}
							onClick={() => setIsCollapse(false)}
						>
							Развернуть
						</IconCollapse>
					) : (
						<IconCollapse
							className={styles.icon_collapse}
							onClick={() => setIsCollapse(true)}
						/>
					)}
					<IconClose
						className={styles.icon_close}
						onClick={onClose}
					/>
				</div>
			</div>

			<div
				className={styles.files_download}
				style={{ display: !isCollapse ? "block" : "none" }}
			>
				{isDownload
					? toast.map((item, i) => (
							<NotificationDownloadFile
								key={i}
								fileInfo={item}
							/>
					  ))
					: toast.map((item, i) => (
							<NotificationUploadFile
								key={i}
								fileInfo={item}
							/>
					  ))}
			</div>
		</div>
	);
};

export default ToastDownloadFiles;
