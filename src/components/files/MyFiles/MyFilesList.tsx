"use client";

import styles from "./MyFilesList.module.scss";
import PortalModals from "@/components/modals/PortalModals/PortalModals";
import IconEmptyFiles from "/public/icon-empty.svg";
import ListWithSearchHOC from "../ListWithSearchHOC";
import ModalLoaderDownloadFile from "@/components/modals/ModalLoaderDownloadFile/ModalLoaderDownloadFile";
import MyFileInfoComponent from "./MyFilesInfo/MyFilesInfo";
import type { IFile } from "@/models/file.model";
import { MyFilesService } from "@/services/my_file.service";
import { type FC, useState, useEffect, useRef, type MouseEventHandler } from "react";

// !WARNING: Может быть удалён, если файлы будут передаваться на уровень выше
const MyFilesList: FC = () => {
	const firstRender = useRef<boolean>(false);
	const fileListRef = useRef<HTMLDivElement | null>(null);
	const [files, setFiles] = useState<IFile[]>([]);
	const [isModal, setIsModal] = useState<boolean>(false);
	const [fileName, setFileName] = useState<string>("");
	const [fileId, setFileId] = useState<string>("");

	const downloadFile: MouseEventHandler<HTMLDivElement> = async (e) => {
		const event = e.target as HTMLElement;

		if (event.tagName === "svg") {
			setFileId(event.parentElement!.getAttribute("data-file-id")!);
			setFileName(event.parentElement!.childNodes[0].textContent!);
			setIsModal(true);
		}

		if (event.tagName === "path") {
			setFileId(event.parentElement!.parentElement!.getAttribute("data-file-id")!);
			setFileName(event.parentElement!.parentElement!.childNodes[0].textContent!);
			setIsModal(true);
		}
	};

	const FilesList = ListWithSearchHOC(MyFileInfoComponent, files, downloadFile);

	// !WARNING: Костыль для получения файлов пользователя
	useEffect(() => {
		if (!firstRender.current) {
			MyFilesService.getMyFiles().then((files) => {
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

			<PortalModals isOpen={isModal}>
				<ModalLoaderDownloadFile
					onClose={() => setIsModal(false)}
					fileName={fileName}
					fileId={fileId}
				/>
			</PortalModals>
		</>
	);
};

export default MyFilesList;
