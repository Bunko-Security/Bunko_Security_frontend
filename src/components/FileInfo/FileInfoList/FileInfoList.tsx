"use client";

import styles from "./FileInfoList.module.scss";
import FileInfoComponent from "../FileInfoComponent/FileInfoComponent";
import { FC } from "react";
import { useEffect, useRef } from "react";

interface FileInfoListProps {
	count: number;
}

const FileInfoList: FC<FileInfoListProps> = ({ count }) => {
	const filesRef = useRef<HTMLDivElement | null>(null);

	// Нужно?
	useEffect(() => {
		const arrayElements = Array.from(filesRef.current!.children) as HTMLElement[];

		if (
			arrayElements.length !== 1 &&
			filesRef.current!.scrollHeight > filesRef.current!.clientHeight
		) {
			console.log(1);
			arrayElements.forEach((child) => {
				child.style.marginRight = "15px";
			});
		} else {
			arrayElements.forEach((child) => {
				child.style.marginRight = "0";
			});
		}
	}, [count]);

	return (
		<div
			ref={filesRef}
			className={styles.files}
		>
			{Array.from({ length: count }).map((_, i) => (
				<FileInfoComponent
					key={i}
					fileName="Имя файла"
					fileAdd="Петров И.В."
					fileDate="12:03 10.09.2023"
				/>
			))}
		</div>
	);
};

export default FileInfoList;
