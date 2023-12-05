import styles from "./ListWithSearchHOC.module.scss";
import InputSearch from "../forms/InputSearch/InputSearch";
import {
	forwardRef,
	type ComponentType,
	type LegacyRef,
	type SVGProps,
	MouseEventHandler,
} from "react";
import { IFile } from "@/models/file.model";

/**
 * @params count - количество файлов
 * * Пока является затычкой для заполнения массива
 * @params files - список файлов для вывода
 * * Пока затычка из пустого массива с длинной count
 */

// TODO: Подумать о том, имеет ли смысл засунуть сюда проверку на отсутствие элементов списка

// * HOC для создания списка с поиском из передаваемых компонентов

// function ListWithSearchHOC<T, P extends SVGProps<SVGSVGElement>>(
function ListWithSearchHOC<T>(
	FileComponent: ComponentType<T>,
	// textNull: string,
	// SVGComponent: ComponentType<P>,
	files: IFile[] | any[], // !WARNING: Вместо any должен быть другой тип
	fnClickList?: MouseEventHandler<HTMLDivElement>,
) {
	// return (props: T, props2: P) => {
	return forwardRef<HTMLDivElement, Omit<T, "file">>((props, ref) => {
		const onClickList: MouseEventHandler<HTMLDivElement> = (e) => {
			fnClickList?.(e);
		};

		return (
			// <>
			// 	{count ? (
			<>
				<InputSearch
					placeholder="Имя файла"
					style={{ marginBottom: 25 }}
				/>
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
			</>
			// 	) : (
			// 		<div className={styles.empty}>
			// 			<p>{textNull}</p>
			// 			<SVGComponent {...props2} />
			// 		</div>
			// 	)}
			// </>
		);
	});
}

export default ListWithSearchHOC;
