"use client";

import ListWithSearch from "@/components/List/ListWithSearch";
import useSWR from "swr";
import PublicFileInfo from "../PublicFiles/PublicFilesInfo/PublicFileInfo";
import AccessibleFilesService from "@/services/accessible_files.service";
import useUploadDownloadFileStore from "@/stores/useUploadDownloadFileStore";
import { KEYS_SWR } from "@/utils/keysSWR";
import type { IParamsSearch } from "@/models/params.model";
import type { IOtherFile } from "@/models/file.model";
import type { FormValuesSearch } from "@/components/forms/formItems/InputSearch/InputSearch";
import {
	type FC,
	useState,
	type UIEventHandler,
	useRef,
	useEffect,
	type MouseEventHandler,
} from "react";

const fetcher = async (params: IParamsSearch) => {
	const files = await AccessibleFilesService.getFiles(params);

	return files;
};

const defaultParams = { limit: 20, offset: 0 };

const AccessibleFilesList: FC = () => {
	const firstRender = useRef<boolean>(false);
	const [files, setFiles] = useState<IOtherFile[]>([]);
	const [isSearch, setIsSearch] = useState<boolean>(false);
	const [isBlockScrollForSearch, setIsBlockScrollForSearch] = useState<boolean>(false);
	const { setIsModalDownload, setDownloadFile } = useUploadDownloadFileStore();

	const isDelay = useRef<boolean>(false);
	const [params, setParams] = useState<IParamsSearch>(defaultParams);
	const { data, isLoading } = useSWR(
		[KEYS_SWR.ACCESSIBLE_FILES, params],
		([_, params]) => fetcher(params),
		{
			revalidateOnFocus: false,
		},
	);

	const handlerSubmitSearch = async (values: FormValuesSearch) => {
		setIsSearch(true);

		if (values.name_like.length) {
			setIsBlockScrollForSearch(true);
			const searchFiles = await AccessibleFilesService.getFiles({ name_like: values.name_like });
			setFiles(searchFiles || []);
		} else {
			setIsBlockScrollForSearch(false);
			setParams({ ...defaultParams });
		}
		setIsSearch(false);
	};

	const handlerScrollList: UIEventHandler<HTMLDivElement> = (e) => {
		const event = e.target as HTMLDivElement;

		if (
			!isBlockScrollForSearch &&
			!isLoading &&
			!isDelay.current &&
			event.scrollHeight - (event.scrollTop + event.offsetHeight) < 50
		) {
			isDelay.current = true;

			if (params.limit === data?.length) {
				setParams((_values) => ({ ..._values, offset: _values.offset! + _values.limit! }));
			}
		} else {
			isDelay.current = false;
		}
	};

	const handlerDownloadFile: MouseEventHandler<HTMLDivElement> = (e) => {
		const event = e.target as HTMLElement;

		if (event.tagName === "svg") {
			const mainParent = event.parentElement!;
			const fileId = Number(mainParent.getAttribute("data-file-id")!);
			setDownloadFile({
				fileId,
				fileName: mainParent.childNodes[0].textContent!,
			});
			setIsModalDownload(true);
		}

		if (event.tagName === "path") {
			const mainParent = event.parentElement!.parentElement!;
			const fileId = Number(mainParent.getAttribute("data-file-id")!);
			setDownloadFile({
				fileId,
				fileName: mainParent.childNodes[0].textContent!,
			});
			setIsModalDownload(true);
		}
	};

	useEffect(() => {
		if (firstRender.current) {
			if (data?.length) {
				if (params.offset !== 0) {
					setFiles((prev) => [...prev, ...data]);
				} else {
					setFiles(data);
				}
			}
		} else {
			firstRender.current = true;
		}
	}, [data, params]);

	return (
		<ListWithSearch
			items={files}
			isLoading={isLoading}
			isSearch={isSearch}
			infiniteScroll
			handlerScrollList={handlerScrollList}
			fnClickList={handlerDownloadFile}
			submitSearchFile={handlerSubmitSearch}
			placeholder="Имя файла"
		>
			{files.map((file) => (
				<PublicFileInfo
					key={file.file_id}
					file={file}
				/>
			))}
		</ListWithSearch>
	);
};

export default AccessibleFilesList;
