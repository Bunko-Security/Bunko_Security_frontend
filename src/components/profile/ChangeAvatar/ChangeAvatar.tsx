"use client";

import styles from "./ChangeAvatar.module.scss";
import Image from "next/image";
import { FC } from "react";

const ChangeAvatar: FC = () => {
	return (
		<div className={styles.preview_avatar}>
			<h3 className={styles.title}>Аватар профиля</h3>
			<Image
				src="/avatar.png"
				alt="Аватар профиля"
				width={120}
				height={120}
			/>
		</div>
	);
};

export default ChangeAvatar;
