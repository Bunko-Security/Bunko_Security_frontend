"use client";

import styles from "./ModalUploadFile.module.scss";
import Tag from "@/components/Tag/Tag";
import Checkbox from "@/components/forms/formItems/Checkbox";
import UserService from "@/services/user.service";
import InputSearch from "@/components/forms/InputSearch/InputSearch";
import UploadFileInfo from "./UploadFileInfo/UploadFileInfo";
import { Encrypt } from "@/utils/functions/encrypt_module/encrypt";
import { cropISODate } from "@/utils/functions/cropISODate";
import type { IFriend } from "@/models/friend.model";
import type { ModalProps } from "@/types/ModalProps.type";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import type { IUploadFile } from "@/models/file.model";
import { type FC, type MouseEventHandler, useState, useRef, useEffect } from "react";

interface ModalUploadFileProps {
	file: File;
}

const maxSelectedFriend = 4;

// TODO: Решить проблему выбора даты не из интервала (0,7)
const ModalUploadFile: FC<ModalUploadFileProps & ModalProps> = ({ file, onClose }) => {
	const firstRender = useRef<boolean>(false);
	const listFriendRef = useRef<HTMLDivElement | null>(null);
	const [endDate, setEndDate] = useState<string>("");
	const [disabled, setDisabled] = useState<boolean>(false);
	const [deleteFriend, setDeleteFriend] = useState<string>("");
	const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

	// !WARNING На время костыля
	const [friends, setFriends] = useState<IFriend[]>([]);

	useDisableScroll();

	// * Добавление tag'а при клике на checkboxes
	const clickListFriends: MouseEventHandler<HTMLDivElement> = (e) => {
		const event = e.target as HTMLElement;
		let name = "";
		setDeleteFriend("");

		if (event.tagName === "LABEL") {
			name = event.childNodes[2].textContent!;
		} else if (event.tagName === "SPAN") {
			name = event.parentNode!.childNodes[2].textContent!;
		}

		if (!name) return;

		if (!selectedFriends.includes(name)) {
			setSelectedFriends((value) => [...value, name]);
		} else {
			setSelectedFriends((value) => {
				const newArray = value.filter((value) => value !== name);
				return newArray;
			});
		}
	};

	// * Удаление tag'а при клике на иконку крестика tag'a
	const clickSelectedListFriends: MouseEventHandler<HTMLDivElement> = (e) => {
		const event = e.target as HTMLElement;

		if (event.parentNode?.nodeName === "svg") {
			const name = event.parentNode.nextSibling?.textContent;

			if (!name) return;

			setSelectedFriends((value) => {
				const newArray = value.filter((value) => value !== name);
				return newArray;
			});

			setDeleteFriend(name);
		}
	};

	const onSubmit = async () => {
		onClose();

		// const readFileAsBase64 = () => {

		const reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = async () => {
			if (reader.result) {
				const fileBuffer = Buffer.from(reader.result.toString(), "binary");

				const dataEncodingFile = await UserService.getPubKeysFriends(selectedFriends);

				if (dataEncodingFile) {
					const encryptData = Encrypt.encryptFile(fileBuffer, dataEncodingFile);
					const encryptFile = new File([encryptData.file], file.name);
					console.log(encryptFile);

					const uploadFile: IUploadFile = {
						fileData: { file: encryptFile, delete_date: endDate },
						fileInfo: encryptData.data,
					};

					await UserService.uploadFile(uploadFile);
				}
			}
		};
		reader.onerror = () => {
			console.log(120);
			console.log(reader.error);
		};

		reader.onprogress = () => {
			console.log(100);
		};
		// }
	};

	useEffect(() => {
		if (selectedFriends.length === maxSelectedFriend) {
			setDisabled(true);
			return;
		}

		setDisabled(false);
	}, [selectedFriends]);

	// !WARNING Временный костыль получения друзей
	useEffect(() => {
		if (!firstRender.current) {
			UserService.getFriends().then((friends) => {
				setFriends(friends || []);
			});
			firstRender.current = true;
		}
	}, []);

	return (
		<>
			<div
				className="overlay"
				onClick={onClose}
			/>

			<div className={styles.modal}>
				<div className={styles.modal_header}>Отправить файл</div>

				<div className={styles.upload_file}>
					<span>Загружаемый файл</span>
					<UploadFileInfo
						fileName={file.name}
						style={{ marginBottom: 20 }}
					/>
				</div>

				<div className={styles.form}>
					<InputSearch
						textLabel="Поиск по имени"
						placeholder="Логин"
					/>
					<div className={styles.select_friends}>
						<div className={styles.my_friends}>
							<h3 className={styles.subtitle}>Ваши друзья</h3>
							<div
								className={styles.list_my_friends}
								onClick={clickListFriends}
								ref={listFriendRef}
							>
								{/* {nameArray.map((value, i) => ( */}
								{friends.map(({ login }, i) => (
									<Checkbox
										key={i}
										className={styles.checkbox_friend}
										value={login}
										checked={deleteFriend === login ? false : undefined}
										disabled={disabled}
									/>
								))}
							</div>
						</div>

						<div className={styles.selected_friends}>
							<h3 className={styles.subtitle}>Выбранные</h3>
							<div
								className={styles.list_selected_friends}
								onClick={clickSelectedListFriends}
								style={{ ...(selectedFriends.length && { marginBottom: 50 }) }}
							>
								{selectedFriends.map((name, i) => (
									<Tag
										key={i}
										text={name}
									/>
								))}
								{selectedFriends.length === maxSelectedFriend && (
									<p>Уже {maxSelectedFriend} человека!</p>
								)}
							</div>
							<input
								type="date"
								placeholder="Дата удаления файла"
								onChange={(date) => setEndDate(date.target.value)}
								style={{ borderRadius: 0 }}
								defaultValue={cropISODate(new Date(), 7)}
							/>
						</div>
					</div>
				</div>

				<div className={styles.buttons}>
					<button
						className={styles.close_btn}
						onClick={onClose}
					>
						Закрыть
					</button>
					<button
						className={styles.forward_btn}
						onClick={onSubmit}
					>
						Отправить
					</button>
				</div>
			</div>
		</>
	);
};

export default ModalUploadFile;
