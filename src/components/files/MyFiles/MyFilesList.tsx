"use client";

import useSWR from "swr";
import PortalModals from "@/components/modals/PortalModals/PortalModals";
import ToastDownloadFiles from "@/components/popups/ToastDownloadFiles/ToastDownloadFiles";
import MyFileInfoComponent from "./MyFilesInfo/MyFilesInfo";
import FilesListWithSearchHOC from "../FilesListWithSearchHOC";
import { KEYS_SWR } from "@/utils/keysSWR";
import { MyFilesService } from "@/services/my_file.service";
import type { IFileDownload } from "@/models/file.model";
import { type FC, useState, useRef, type MouseEventHandler } from "react";

const fetcher = async () => {
	const files = await MyFilesService.getMyFiles();

	return files;
};

// !WARNING: Может быть удалён, если файлы будут передаваться на уровень выше
const MyFilesList: FC = () => {
	const fileListRef = useRef<HTMLDivElement | null>(null);
	const [isModal, setIsModal] = useState<boolean>(false);
	const [file, setFile] = useState<IFileDownload | null>(null);

	const { data, error, isLoading } = useSWR(KEYS_SWR.MY_FILES, fetcher);

	const downloadFile: MouseEventHandler<HTMLDivElement> = async (e) => {
		const event = e.target as HTMLElement;

		if (event.tagName === "svg") {
			const mainParent = event.parentElement!.parentElement!;
			if (event.getAttribute("data-action") === "download") {
				setFile({
					fileId: mainParent.getAttribute("data-file-id")!,
					fileName: mainParent.childNodes[0].textContent!,
				});
				setIsModal(true);
			} else {
				console.log("DELETE", mainParent.childNodes[0].textContent!);
			}
		}

		if (event.tagName === "path") {
			const mainParent = event.parentElement!.parentElement!.parentElement!;
			if (event.parentElement!.getAttribute("data-action") === "download") {
				setFile({
					fileId: mainParent.getAttribute("data-file-id")!,
					fileName: mainParent.childNodes[0].textContent!,
				});
				setIsModal(true);
			} else {
				console.log("DELETE", mainParent.childNodes[0].textContent!);
			}
		}
	};

	const FilesList = FilesListWithSearchHOC(MyFileInfoComponent, data, isLoading, downloadFile);

	return (
		<>
			<FilesList ref={fileListRef} />

			<PortalModals isOpen={isModal}>
				<ToastDownloadFiles
					file={file}
					onClose={() => setIsModal(false)}
				/>
			</PortalModals>
		</>
	);
};

export default MyFilesList;
