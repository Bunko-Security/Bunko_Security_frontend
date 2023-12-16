"use client";

import styles from "./NotificationDownloadFile.module.scss";
import { DecryptModule } from "@/utils/encrypt/decrypt.module";
import { LOCAL_STORAGE } from "@/utils/keysName";
import { MyFilesService } from "@/services/my_file.service";
import { AxiosProgressEvent } from "axios";
import { useState, type FC, useEffect, useRef } from "react";
import { IFileDownload } from "@/models/file.model";

interface LoaderDownloadFile {
	file: IFileDownload;
}

const NotificationDownloadFile: FC<LoaderDownloadFile> = ({ file }) => {
	const downloadProgressRef = useRef<number>(0);
	const firstRender = useRef<boolean>(false);
	const [iterNow, setIterNow] = useState<number>(-1);
	const [fileSize, setFileSize] = useState<string>("");
	const [downloadTotal, setDownloadTotal] = useState<number>(0);
	const [downloadProgress, setDownloadProgress] = useState<number>(0);
	const [countIterDecrypt, setCountIterDecrypt] = useState<number>(0);

	const getCountIter = (count: number) => {
		setCountIterDecrypt(count);
	};

	const getIterNow = (iter: number) => {
		setIterNow(iter);
	};

	const onDownloadFile = (progressEvent: AxiosProgressEvent) => {
		if (progressEvent) {
			const { progress, total } = progressEvent;

			if (!downloadTotal && total) {
				setDownloadTotal(total);
			}

			if (progress && Math.round(progress * 100) > downloadProgressRef.current) {
				setDownloadProgress(Math.round(progress * 100));
				downloadProgressRef.current = Math.round(progress * 100);
			}
		}
	};

	useEffect(() => {
		const uploadAndEncFile = async () => {
			const encFileWithData = await MyFilesService.downloadFile(file.fileId, onDownloadFile);

			if (encFileWithData) {
				const { file, name, type, data } = encFileWithData;
				const encFileBuffer = Buffer.from(file);

				const decFileBuffer = await DecryptModule.decryptFile(
					encFileBuffer,
					data.secret_key,
					data.priv_key,
					localStorage.getItem(LOCAL_STORAGE.HASH_ENCRYPT)!,
					getCountIter,
					getIterNow,
				);

				const decFile = new Blob([decFileBuffer], { type: type });
				console.log(decFile);

				// const downloadURL = URL.createObjectURL(decFile);
				// const link = document.createElement("a");
				// link.href = downloadURL;
				// link.download = name || "1231232141241241412";
				// link.click();
				// URL.revokeObjectURL(downloadURL);
			}
		};

		if (!firstRender.current) {
			firstRender.current = true;
			uploadAndEncFile();
		}
	}, [file.fileId]);

	useEffect(() => {
		if (downloadTotal) {
			if (downloadTotal < 1024) {
				setFileSize(`${downloadTotal} Б`);
			} else if (downloadTotal / 1024 < 1024) {
				let totalSize = (downloadTotal / 1024).toFixed(2);
				setFileSize(`${totalSize} КБ`);
			} else if (downloadTotal / 1024 / 1024 < 1024) {
				let totalSize = (downloadTotal / 1024 / 1024).toFixed(2);
				setFileSize(`${totalSize} МБ`);
			} else {
				let totalSize = (downloadTotal / 1024 / 1024 / 1024).toFixed(2);
				setFileSize(`${totalSize} ГБ`);
			}
		}
	}, [downloadTotal]);

	return (
		<div className={styles.modal}>
			<div className={styles.download_file}>
				<div className={styles.file}>
					<span className={styles.file_name}>{file.fileName}</span>
					<span className={styles.file_length}>{fileSize}</span>
				</div>

				<div className={styles.download_progress}>
					<div className={styles.progress_line}>
						{!countIterDecrypt ? (
							<>
								<span className={styles.progress_percent}>{`${downloadProgress}%`}</span>
								<div
									className={styles.progress_bar}
									style={{ width: `${downloadProgress}%` }}
								/>
							</>
						) : (
							<>
								<span className={styles.progress_percent}>
									{countIterDecrypt === iterNow ? "Скачено" : `${iterNow}/${countIterDecrypt}`}
								</span>
								<div
									className={styles.progress_bar}
									style={{ width: `${Math.round((100 / countIterDecrypt) * iterNow)}%` }}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationDownloadFile;
