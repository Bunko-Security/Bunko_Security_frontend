"use client";

import styles from "./NotificationUploadFile.module.scss";
import { mutate } from "swr";
import { KEYS_SWR } from "@/utils/keysSWR";
import { EncryptModule } from "@/utils/encrypt/encrypt.module";
import { MyFilesService } from "@/services/my_files.service";
import type { AxiosProgressEvent } from "axios";
import { useState, type FC, useEffect, useRef } from "react";
import type { IUploadFileInfo, IUploadFile, IUploadPublicFile } from "@/models/file.model";

export interface NotificationUploadFileProps {
	fileInfo: IUploadFileInfo;
}

const NotificationUploadFile: FC<NotificationUploadFileProps> = ({ fileInfo }) => {
	const uploadProgressRef = useRef<number>(0);
	const firstRender = useRef<boolean>(false);
	const [iterNow, setIterNow] = useState<number>(0);
	const [fileSize, setFileSize] = useState<string>("");
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [countIterEncrypt, setCountIterEncrypt] = useState<number>(1);

	const getCountIter = (count: number) => {
		setCountIterEncrypt(count);
	};

	const getIterNow = (iter: number) => {
		setIterNow(iter);
	};

	const onUploadFile = (progressEvent: AxiosProgressEvent) => {
		if (progressEvent) {
			const { progress } = progressEvent;

			if (progress && Math.round(progress * 100) > uploadProgressRef.current) {
				setUploadProgress(Math.round(progress * 100));
				uploadProgressRef.current = Math.round(progress * 100);
			}
		}
	};

	useEffect(() => {
		const uploadAndDecFile = async () => {
			const reader = new FileReader();
			reader.readAsBinaryString(fileInfo.file);
			reader.onload = async () => {
				if (reader.result) {
					const fileBuffer = Buffer.from(reader.result.toString(), "binary");

					if (fileInfo.selectedFriends.length) {
						const dataEncodingFile = await MyFilesService.getPubKeysFriends(
							fileInfo.selectedFriends,
						);

						if (dataEncodingFile) {
							const encryptData = await EncryptModule.encryptFile(
								fileBuffer,
								dataEncodingFile,
								getCountIter,
								getIterNow,
							);
							const encryptFile = new File([encryptData.file], fileInfo.file.name);

							const uploadFile: IUploadFile = {
								fileData: { file: encryptFile, delete_date: fileInfo.endDate },
								fileInfo: encryptData.data,
							};

							await MyFilesService.uploadFile(uploadFile, onUploadFile);
							mutate([KEYS_SWR.MY_FILES, ""]);
						}
					} else {
						const encryptData = await EncryptModule.encryptPublicFile(
							fileBuffer,
							getCountIter,
							getIterNow,
						);
						const encryptFile = new File([encryptData.file], fileInfo.file.name);

						const uploadFile: IUploadPublicFile = {
							file: encryptFile,
							delete_date: fileInfo.endDate,
							secret_key: encryptData.pass,
						};

						await MyFilesService.uploadPublicFile(uploadFile, onUploadFile);
						mutate([KEYS_SWR.PUBLIC_FILES, { name_like: "", limit: 20, offset: 0 }]);
					}
				}
			};
		};

		if (!firstRender.current) {
			firstRender.current = true;
			uploadAndDecFile();
		}
	}, []);

	useEffect(() => {
		const size = fileInfo.file.size;

		if (size) {
			if (size < 1024) {
				setFileSize(`${size} Б`);
			} else if (size / 1024 < 1024) {
				let totalSize = (size / 1024).toFixed(2);
				setFileSize(`${totalSize} КБ`);
			} else if (size / 1024 / 1024 < 1024) {
				let totalSize = (size / 1024 / 1024).toFixed(2);
				setFileSize(`${totalSize} МБ`);
			} else {
				let totalSize = (size / 1024 / 1024 / 1024).toFixed(2);
				setFileSize(`${totalSize} ГБ`);
			}
		}
	}, [fileInfo.file.size]);

	return (
		<div className={styles.modal}>
			<div className={styles.download_file}>
				<div className={styles.file}>
					<span className={styles.file_name}>{fileInfo.file.name}</span>
					<span className={styles.file_length}>{fileSize}</span>
				</div>

				<div className={styles.download_progress}>
					<div className={styles.progress_line}>
						{countIterEncrypt === iterNow ? (
							<>
								<span className={styles.progress_percent}>
									{uploadProgress === 100 ? "Загружено" : `${uploadProgress}%`}
								</span>
								<div
									className={styles.progress_bar}
									style={{ width: `${uploadProgress}%` }}
								/>
							</>
						) : (
							<>
								<span className={styles.progress_percent}>
									{countIterEncrypt === iterNow ? "Зашифровано" : `${iterNow}/${countIterEncrypt}`}
								</span>
								<div
									className={styles.progress_bar}
									style={{ width: `${Math.round((100 / countIterEncrypt) * iterNow)}%` }}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationUploadFile;
