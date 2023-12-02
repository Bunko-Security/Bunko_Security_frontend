"use client";

import styles from "./UploadFile.module.scss";
import IconAddFile from "/public/icon-add-file.svg";
import PortalModals from "@/components/modals/PortalModals/PortalModals";
import ModalUploadFile from "@/components/modals/ModalUploadFile/ModalUploadFile";
import { type ChangeEventHandler, type FC, useRef, useState } from "react";

const UploadFile: FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [isModal, setIsModal] = useState<boolean>(false);

	const onClick = () => {
		inputRef.current?.click();
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { files } }) => {
		if (files?.length) {
			setIsModal(true);
			setFile(files[0]);
		}
	};

	return (
		<>
			<div className={styles.import_files}>
				<h3 className={styles.import_files_title}>Загрузка файлов</h3>
				<form>
					<input
						ref={inputRef}
						type="file"
						onChange={onChange}
						value=""
					/>
					<div
						className={styles.import_btn}
						onClick={onClick}
					>
						<IconAddFile className={styles.icon_add_files} />
					</div>
				</form>
			</div>

			<PortalModals isOpen={isModal}>
				<ModalUploadFile
					file={file!}
					onClose={() => setIsModal(false)}
				/>
			</PortalModals>
		</>
	);
};

export default UploadFile;
