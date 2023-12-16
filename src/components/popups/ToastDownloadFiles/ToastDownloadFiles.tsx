"use client";

import styles from "./ToastDownloadFiles.module.scss";
import IconClose from "/public/icon-close.svg";
import IconCollapse from "/public/toast/toast-collapse.svg";
import NotificationDownloadFile from "../NotificationDownloadFile/NotificationDownloadFile";
import { ModalProps } from "@/types/ModalProps.type";
import { IFileDownload } from "@/models/file.model";
import { FC, useEffect, useRef, useState } from "react";

interface ToastDownloadFilesProps {
	file: IFileDownload | null;
}

const ToastDownloadFiles: FC<ModalProps & ToastDownloadFilesProps> = ({ file, onClose }) => {
	const firstRender = useRef<boolean>(false);
	const [toast, setToast] = useState<IFileDownload[]>([]);
	const [isCollapse, setIsCollapse] = useState<boolean>(false);

	useEffect(() => {
		if (file && firstRender.current) {
			setToast((items) => [...items, file]);
			console.log(toast);
		} else {
			firstRender.current = true;
		}
	}, [file]);

	return (
		<div className={styles.toast}>
			<div className={styles.header}>
				<h2>Скачивание файла</h2>
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
				{toast.map((item, i) => (
					<NotificationDownloadFile
						key={i}
						file={item}
					/>
				))}
			</div>
		</div>
	);
};

export default ToastDownloadFiles;
