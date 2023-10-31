"use client";

import styles from "./ImportAvatar.module.scss";
import Image from "next/image";
import IconEdit from "/public/icon-edit.svg";
import { ChangeEventHandler, FC, useRef } from "react";

const ImportAvatar: FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onClick = () => {
		inputRef.current?.click();
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log(e.target.files);
	};

	const onSubmit = () => {};

	return (
		<form
			className={styles.form_avatar}
			onClick={onClick}
			onSubmit={onSubmit}
		>
			<input
				ref={inputRef}
				className={styles.input_file}
				type="file"
				accept=".jpg,.png,.jpeg,.webp,.avif"
				onChange={onChange}
			/>

			<div className={styles.avatar_wrapper}>
				<Image
					className={styles.avatar_image}
					src="/avatar.png"
					alt="Аватар профиля"
					width={120}
					height={120}
				/>
				<div className={styles.change_btn}>
					<IconEdit />
				</div>
			</div>
		</form>
	);
};

export default ImportAvatar;
