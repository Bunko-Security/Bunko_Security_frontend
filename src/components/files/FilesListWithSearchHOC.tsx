import styles from "./FilesListWithSearchHOC.module.scss";
import Loader from "../Loader/Loader";
import InputSearch from "../forms/InputSearch/InputSearch";
import IconEmptyFiles from "/public/icon-empty.svg";
import { IFile } from "@/models/file.model";
import { forwardRef, type ComponentType, type MouseEventHandler } from "react";

// TODO: Подумать о том, имеет ли смысл засунуть сюда проверку на отсутствие элементов списка

// * HOC для создания списка с поиском из передаваемых компонентов

function FilesListWithSearchHOC<T>(
	FileComponent: ComponentType<T>,
	files: IFile[] | any[] | undefined, // !WARNING: Вместо any должен быть другой тип
	isLoading: boolean,
	fnClickList?: MouseEventHandler<HTMLDivElement>,
) {
	return forwardRef<HTMLDivElement, Omit<T, "file">>((props, ref) => {
		const onClickList: MouseEventHandler<HTMLDivElement> = (e) => {
			fnClickList?.(e);
		};

		return (
			<div className={styles.files_list}>
				<InputSearch
					placeholder="Имя файла"
					style={{ marginBottom: 25 }}
				/>
				{isLoading && <Loader />}
				{files && files.length > 0 && (
					<div
						className={styles.files}
						ref={ref}
						onClick={onClickList}
					>
						{files.map((file) => (
							<FileComponent
								key={file.file_id}
								file={file}
								{...(props as T)}
							/>
						))}
					</div>
				)}
				{!isLoading && files?.length === 0 && (
					<div className={styles.empty}>
						<p>Нет файлов для скачивания</p>
						<IconEmptyFiles className={styles.icon_empty} />
					</div>
				)}
			</div>
		);
	});
}

export default FilesListWithSearchHOC;
