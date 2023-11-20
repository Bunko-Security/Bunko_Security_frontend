"use client";

import styles from "./ImportFiles.module.scss";
import IconAddFile from "/public/icon-add-file.svg";
import { type ChangeEventHandler, type FC, useRef } from "react";

const ImportFiles: FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onClick = () => {
		inputRef.current?.click();
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log(e.target.files);
	};

	return (
		<div className={styles.import_files}>
			<h3 className={styles.import_files_title}>Загрузка файлов</h3>
			<form>
				<input
					ref={inputRef}
					type="file"
					multiple
					onChange={onChange}
				/>
				<div
					className={styles.import_btn}
					onClick={onClick}
				>
					<IconAddFile className={styles.icon_add_files} />
				</div>
			</form>
		</div>
	);
};

export default ImportFiles;
