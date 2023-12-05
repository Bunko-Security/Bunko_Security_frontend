"use client";

import styles from "./MyFilesList.module.scss";
import UserService from "@/services/user.service";
import IconEmptyFiles from "/public/icon-empty.svg";
import ListWithSearchHOC from "../ListWithSearchHOC";
import MyFileInfoComponent from "./MyFilesInfo/MyFilesInfo";
import { Encrypt } from "@/utils/functions/encrypt_module/encrypt";
import type { IFile } from "@/models/file.model";
import { LOCAL_STORAGE } from "@/utils/keysName";
import { type FC, useState, useEffect, useRef, type MouseEventHandler } from "react";

// !WARNING: Может быть удалён, если файлы будут передаваться на уровень выше
const MyFilesList: FC = () => {
	const firstRender = useRef<boolean>(false);
	const fileListRef = useRef<HTMLDivElement | null>(null);
	const [files, setFiles] = useState<IFile[]>([]);

	const onDownloadFile: MouseEventHandler<HTMLDivElement> = async (e) => {
		const event = e.target as HTMLElement;
		let fileId: number = -1;

		if (event.tagName === "svg") {
			fileId = Number(event.parentElement!.getAttribute("data-file-id"));
		}

		if (event.tagName === "path") {
			fileId = Number(event.parentElement!.parentElement!.getAttribute("data-file-id"));
		}

		if (fileId !== -1) {
			const encFileWithData = await UserService.downloadFile(fileId);

			if (encFileWithData) {
				const { file, name, type, data } = encFileWithData;
				const ecrFileBuffer = Buffer.from(file);
				const encFileBuffer = Encrypt.decryptFile(
					ecrFileBuffer,
					data.secret_key,
					data.priv_key,
					localStorage.getItem(LOCAL_STORAGE.HASH_ENCRYPT)!,
				);

				const encFile = new Blob([encFileBuffer], { type: type });
				console.log(encFile);

				const downloadURL = URL.createObjectURL(encFile);
				const link = document.createElement("a");
				link.href = downloadURL;
				link.download = name || "1231232141241241412";
				link.click();
				URL.revokeObjectURL(downloadURL);
			}
		}
	};

	const FilesList = ListWithSearchHOC(MyFileInfoComponent, files, onDownloadFile);

	// !WARNING: Костыль для получения файлов пользователя
	useEffect(() => {
		if (!firstRender.current) {
			UserService.getMyFiles().then((files) => {
				setFiles(files);
			});
			firstRender.current = true;
		}
	}, []);

	return (
		<>
			{files.length ? (
				<FilesList ref={fileListRef} />
			) : (
				<div className={styles.empty}>
					<p>Нет файлов для скачивания</p>
					<IconEmptyFiles className={styles.icon_empty} />
				</div>
			)}
		</>
	);
};

export default MyFilesList;
