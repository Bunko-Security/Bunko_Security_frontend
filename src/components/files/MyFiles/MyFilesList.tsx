"use client";

import ListWithSearch from "../../List/ListWithSearch";
import useSWR from "swr";
import MyFileInfo from "./MyFilesInfo/MyFilesInfo";
import useUploadDownloadFileStore from "@/stores/useUploadDownloadFileStore";
import { KEYS_SWR } from "@/utils/keysSWR";
import { MyFilesService } from "@/services/my_files.service";
import type { FormValuesSearch } from "@/components/forms/formItems/InputSearch/InputSearch";
import { type FC, useState, type MouseEventHandler } from "react";

const fetcher = async (search: string) => {
	const friends = await MyFilesService.getMyFiles({ name_like: search });

	return friends;
};

const MyFilesList: FC = () => {
	const { setIsModalDownload, setDownloadFile } = useUploadDownloadFileStore();

	const [search, setSearch] = useState<string>("");
	const {
		data: files = [],
		isLoading,
		mutate,
	} = useSWR([KEYS_SWR.MY_FILES, search], ([_, search]) => fetcher(search), {
		revalidateOnFocus: false,
	});

	const handlerSubmitSearch = async (values: FormValuesSearch) => {
		if (search !== values.name_like) {
			setSearch(values.name_like);
		} else {
			mutate();
		}
	};

	const handlerDownloadFile: MouseEventHandler<HTMLDivElement> = async (e) => {
		const event = e.target as HTMLElement;

		if (event.tagName === "svg") {
			const mainParent = event.parentElement!.parentElement!;
			const fileId = Number(mainParent.getAttribute("data-file-id")!);

			if (event.getAttribute("data-action") === "download") {
				setDownloadFile({
					fileId,
					fileName: mainParent.childNodes[0].textContent!,
				});
				setIsModalDownload(true);
			} else {
				await MyFilesService.deleteFile(fileId);
				mutate();
			}
		}

		if (event.tagName === "path") {
			const mainParent = event.parentElement!.parentElement!.parentElement!;
			const fileId = Number(mainParent.getAttribute("data-file-id")!);

			if (event.parentElement!.getAttribute("data-action") === "download") {
				setDownloadFile({
					fileId,
					fileName: mainParent.childNodes[0].textContent!,
				});
				setIsModalDownload(true);
			} else {
				await MyFilesService.deleteFile(fileId);
				mutate();
			}
		}
	};

	return (
		<ListWithSearch
			items={files}
			isLoading={isLoading}
			submitSearchFile={handlerSubmitSearch}
			fnClickList={handlerDownloadFile}
			placeholder="Имя файла"
		>
			{files.map((file) => (
				<MyFileInfo
					key={file.file_id}
					file={file}
				/>
			))}
		</ListWithSearch>
	);
};

export default MyFilesList;
