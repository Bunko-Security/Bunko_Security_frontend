"use client";

import "react-image-crop/src/ReactCrop.scss";
import styles from "./ModalImageCrop.module.scss";
import Loader from "@/components/Loader/Loader";
import useUserStore from "@/stores/useUserStore.store";
import type { ModalProps } from "@/types/ModalProps.type";
import ReactCrop, { makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";
import { type FC, type ReactEventHandler, useEffect, useState, useRef } from "react";

interface ModalImageCropProps extends ModalProps {
	avatar: File;
}

const ModalImageCrop: FC<ModalImageCropProps> = ({ avatar, onClose }) => {
	const imgRef = useRef<HTMLImageElement>(null);
	const { updateAvatar } = useUserStore();
	const [crop, setCrop] = useState<Crop>();
	const [picture, setPicture] = useState<string>("");
	const [cropAvatar, setCropAvatar] = useState<PixelCrop>();

	// * Для автоматической настройки круга обрезки при загрузке фото

	const onImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
		const { naturalWidth, naturalHeight } = e.currentTarget;
		const circleCrop = makeAspectCrop({ unit: "%", width: 100 }, 1, naturalWidth, naturalHeight);
		setCrop(circleCrop);
	};

	/**
	 * * Создание canvas на основе полученного размера cropAvatar
	 * @params cropAvatar является перетаскиваемым div, благодаря
	 * которому считывается размер выбираемой аватарки
	 * * И отправка нарисованного canvas на сервер
	 */

	const onUpdateCropAvatar = () => {
		const image = imgRef.current;
		if (!image || !cropAvatar) {
			throw new Error("Crop canvas does not exist");
		}

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const canvas = document.createElement("canvas");
		canvas.style.visibility = "hidden";
		canvas.width = cropAvatar.width;
		canvas.height = cropAvatar.height;

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("No 2d context");
		}

		ctx.drawImage(
			image,
			cropAvatar.x * scaleX,
			cropAvatar.y * scaleY,
			cropAvatar.width * scaleX,
			cropAvatar.height * scaleY,
			0,
			0,
			cropAvatar.width,
			cropAvatar.height,
		);

		canvas.toBlob(
			(blob) => {
				if (blob) {
					updateAvatar(blob, avatar.name);
					onClose();
				}
			},
			avatar.type,
			1,
		);
	};

	// * Считывание файла

	useEffect(() => {
		const reader = new FileReader();
		reader.readAsDataURL(avatar);
		reader.onload = () => {
			if (reader.result) {
				setPicture(reader.result.toString() || "");
			}
		};
	}, [avatar]);

	return (
		<>
			<div
				className="overlay"
				onClick={onClose}
			/>
			<div className={styles.modal}>
				<div className={styles.modal_header}>
					<h2 className={styles.title}>Обрезка фото для аватарки</h2>
				</div>

				<div className={styles.modal_content}>
					{!!picture ? (
						<ReactCrop
							crop={crop}
							onChange={(_, percentCrop) => setCrop(percentCrop)}
							aspect={1}
							circularCrop
							keepSelection
							onComplete={(c) => setCropAvatar(c)}
						>
							<img
								ref={imgRef}
								src={picture}
								onLoad={onImageLoad}
							/>
						</ReactCrop>
					) : (
						<Loader />
					)}
				</div>

				<div className={styles.modal_footer}>
					<button onClick={onUpdateCropAvatar}>Загрузить</button>
				</div>
			</div>
		</>
	);
};

export default ModalImageCrop;
