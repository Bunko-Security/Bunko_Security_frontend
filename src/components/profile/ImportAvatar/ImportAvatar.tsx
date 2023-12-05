"use client";

import styles from "./ImportAvatar.module.scss";
import IconEdit from "/public/icon-edit.svg";
import useUserStore from "@/stores/useUserStore.store";
import PortalModals from "@/components/modals/PortalModals/PortalModals";
import ModalImageCrop from "@/components/modals/ModalImageCrop/ModalImageCrop";
import { type ChangeEventHandler, type FC, useRef, useState } from "react";

// TODO: Поправить загрузку аватара при клике на img_loader
const ImportAvatar: FC = () => {
	const { user, isLoading } = useUserStore();
	const [file, setFile] = useState<File | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onClick = () => {
		if (!isLoading) {
			inputRef.current?.click();
		}
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		if (target.files?.length) {
			setFile(target.files[0]);
			setIsOpen(true);
		}
	};

	return (
		<>
			<form className={styles.form_avatar}>
				<input
					ref={inputRef}
					className={styles.input_file}
					type="file"
					accept=".jpg,.png,.jpeg,.webp,.avif"
					onChange={onChange}
					autoComplete="off"
					value=""
				/>

				<div
					className={styles.avatar_wrapper}
					onClick={onClick}
				>
					{isLoading ? (
						<div className={`${styles.img_loading} avatar`} />
					) : (
						<>
							<img
								className="avatar"
								src={user?.avatar_path || "/avatar.png"}
								alt="Аватар профиля"
								height={120}
								width={120}
							/>
							<div className={styles.change_btn}>
								<IconEdit />
							</div>
						</>
					)}
				</div>
			</form>

			<PortalModals isOpen={isOpen}>
				<ModalImageCrop
					onClose={() => setIsOpen(false)}
					avatar={file!}
				/>
			</PortalModals>
		</>
	);
};

export default ImportAvatar;
