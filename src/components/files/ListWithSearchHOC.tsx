import styles from "./ListWithSearchHOC.module.scss";
import InputSearch from "../forms/InputSearch/InputSearch";
import type { ComponentType, SVGProps } from "react";

/**
 * @params count - количество файлов
 * * Пока является затычкой для заполнения массива
 * @params files - список файлов для вывода
 * * Пока затычка из пустого массива с длинной count
 */

// TODO: Подумать о том, имеет ли смысл засунуть сюда проверку на отсутствие элементов списка

// * HOC для создания списка с поиском из передаваемых компонентов

function ListWithSearchHOC<T, P extends SVGProps<SVGSVGElement>>(
	count: number,
	FileComponent: ComponentType<T>,
	// textNull: string,
	// SVGComponent: ComponentType<P>,
	files?: any,
) {
	return (props: T, props2: P) => {
		return (
			// <>
			// 	{count ? (
			<>
				<InputSearch
					placeholder="Имя файла"
					style={{ marginBottom: 25 }}
				/>
				<div className={styles.files}>
					{Array.from({ length: count }).map((_, i) => (
						<FileComponent
							key={i}
							{...props}
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
	};
}

export default ListWithSearchHOC;
