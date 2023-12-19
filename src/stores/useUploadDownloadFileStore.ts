import { shallow } from "zustand/shallow";
import { devtools } from "zustand/middleware";
import { NAME_STORES } from "@/stores/nameStores";
import { createWithEqualityFn } from "zustand/traditional";
import type { IDownloadFileInfo, IUploadFileInfo } from "@/models/file.model";

// * Конфигурация для вызова модалок скачивания/загрузки файлов

type UploadDownloadFileStore = {
	isModalDownload: boolean;
	setIsModalDownload: (boolean: boolean) => void;
	downloadFile: IDownloadFileInfo | null;
	setDownloadFile: (file: IDownloadFileInfo | null) => void;
	isModalUpload: boolean;
	setIsModalUpload: (boolean: boolean) => void;
	uploadFile: IUploadFileInfo | null;
	setUploadFile: (file: IUploadFileInfo | null) => void;
};

const useUploadDownloadFileStore = createWithEqualityFn<UploadDownloadFileStore>()(
	devtools(
		(set) => ({
			isModalDownload: false,
			setIsModalDownload: (boolean) => {
				set({ isModalDownload: boolean }, false, "changeIsModalDownload");
			},
			downloadFile: null,
			setDownloadFile: (file) => {
				set({ downloadFile: file });
			},
			isModalUpload: false,
			setIsModalUpload: (boolean) => {
				set({ isModalUpload: boolean }, false, "changeIsModalUpload");
			},
			uploadFile: null,
			setUploadFile: (file) => {
				set({ uploadFile: file });
			},
		}),
		{
			name: NAME_STORES.MODAL_FILES,
		},
	),
	shallow,
);

export default useUploadDownloadFileStore;
