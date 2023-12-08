"use client";

import styles from "./ModalLoaderDownloadFile.module.scss";
import { DecryptModule } from "@/utils/encrypt/decrypt.module";
import { LOCAL_STORAGE } from "@/utils/keysName";
import { MyFilesService } from "@/services/my_file.service";
import type { ModalProps } from "@/types/ModalProps.type";
import { AxiosProgressEvent } from "axios";
import { useState, type FC, useEffect, useRef } from "react";

interface LoaderDownloadFile {
	fileId: string;
	fileName: string;
}

const ModalLoaderDownloadFile: FC<ModalProps & LoaderDownloadFile> = ({
	onClose,
	fileName,
	fileId,
}) => {
	const downloadProgressRef = useRef<number>(0);
	const firstRender = useRef<boolean>(false);
	const [iterNow, setIterNow] = useState<number>(0);
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
			const encFileWithData = await MyFilesService.downloadFile(fileId, onDownloadFile);

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
	}, [fileId]);

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

	useEffect(() => {
		console.log(countIterDecrypt);
	}, [countIterDecrypt]);

	return (
		<div className={styles.modal}>
			<div className={styles.modal_header}>Скачивание файла</div>

			<div className={styles.download_file}>
				<div className={styles.file}>
					<span className={styles.file_name}>{fileName}</span>
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
								<span className={styles.progress_percent}>{`${iterNow}/${countIterDecrypt}`}</span>
								<div
									className={styles.progress_bar}
									style={{ width: `${Math.round((100 / countIterDecrypt) * iterNow)}%` }}
								/>
							</>
						)}
					</div>
				</div>
			</div>

			<button onClick={onClose}>Закрыть</button>
		</div>
	);
};

export default ModalLoaderDownloadFile;
