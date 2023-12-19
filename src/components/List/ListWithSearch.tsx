import styles from "./ListWithSearch.module.scss";
import Loader from "@/components/Loader/Loader";
import IconEmptyFiles from "/public/icon-empty.svg";
import type { IFriend } from "@/models/friend.model";
import type { IOtherFile, IMyFile } from "@/models/file.model";
import InputSearch, {
	type FormValuesSearch,
} from "@/components/forms/formItems/InputSearch/InputSearch";
import type { FC, MouseEventHandler, ReactNode, UIEventHandler } from "react";

interface ListProps {
	items: IMyFile[] | IFriend[] | IOtherFile[] | undefined;
	infiniteScroll?: boolean;
	isLoading: boolean;
	isSearch?: boolean;
	placeholder?: string;
	handlerScrollList?: UIEventHandler<HTMLDivElement>;
	fnClickList?: MouseEventHandler<HTMLDivElement>;
	submitSearchFile: (values: FormValuesSearch) => void;
	children?: ReactNode;
	textEmpty?: string;
}

const ListWithSearch: FC<ListProps> = ({
	items,
	infiniteScroll = false,
	isLoading,
	isSearch,
	handlerScrollList,
	fnClickList,
	submitSearchFile,
	children,
	placeholder = "Что вы ищете?",
	textEmpty,
}) => {
	let isTest = false;

	if (infiniteScroll) {
		isTest = items && items.length > 0 ? true : false;
	} else {
		isTest = !isLoading && items && items.length > 0 ? true : false;
	}

	const onClickList: MouseEventHandler<HTMLDivElement> = (e) => {
		fnClickList?.(e);
	};

	return (
		<div className={styles.files_list}>
			<InputSearch
				placeholder={placeholder}
				style={{ marginBottom: 25 }}
				submitInput={submitSearchFile}
			/>
			{isSearch ? (
				<Loader />
			) : (
				<>
					{infiniteScroll && isLoading && items?.length === 0 && <Loader />}
					{!infiniteScroll && isLoading && <Loader />}
					{isTest && (
						<div
							className={styles.files}
							onClick={onClickList}
							onScroll={handlerScrollList}
						>
							{children}
							{infiniteScroll && isLoading && <Loader />}
						</div>
					)}
					{!isLoading && items?.length === 0 && (
						<div className={styles.empty}>
							<p>{textEmpty ?? "Нет файлов для скачивания"}</p>
							<IconEmptyFiles className={styles.icon_empty} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ListWithSearch;
