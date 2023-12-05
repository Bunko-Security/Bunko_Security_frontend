"use client";

import styles from "./PublicFilesList.module.scss";
import IconEmptyFiles from "/public/icon-empty.svg";
import PublicFileInfo from "./PublicFilesInfo/PublicFileInfo";
import ListWithSearchHOC from "../ListWithSearchHOC";
import { type FC, useState } from "react";

const files = [
	{
		name: "Имя файла",
		byUser: "Петров И.В.",
		date: "12:03 10.09.2023",
	},
];

// const fetcher = async (params?: ParamsProducts) => {
// 	const products = await ProductsService.getAll(params);

// 	return products;
// };

// !WARNING: Может быть удалён, если файлы будут передаваться на уровень выше

const PublicFilesList: FC = () => {
	const [count, setCount] = useState<number>(1);
	//   const { data, error, mutate, isValidating } = useSWR(`/products/${categoryId}`, () =>
	//   fetcher(params.current),
	// );

	const FilesList = ListWithSearchHOC(PublicFileInfo, files);

	return (
		<>
			{count ? (
				<FilesList />
			) : (
				<div className={styles.empty}>
					<p>Нет файлов для скачивания</p>
					<IconEmptyFiles className={styles.icon_empty} />
				</div>
			)}
		</>
	);
};

export default PublicFilesList;
