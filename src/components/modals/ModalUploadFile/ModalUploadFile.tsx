"use client";

import styles from "./ModalUploadFile.module.scss";
import Tag from "@/components/Tag/Tag";
import Loader from "@/components/Loader/Loader";
import useSWR from "swr";
import Checkbox from "@/components/forms/formItems/Checkbox/Checkbox";
import UploadFileInfo from "./UploadFileInfo/UploadFileInfo";
import CoworkersService from "@/services/coworkers.service";
import useUploadDownloadFileStore from "@/stores/useUploadDownloadFileStore";
import { KEYS_SWR } from "@/utils/keysSWR";
import { cropISODate } from "@/utils/functions/cropISODate";
import type { ModalProps } from "@/types/ModalProps.type";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import InputSearch, {
	type FormValuesSearch,
} from "@/components/forms/formItems/InputSearch/InputSearch";
import { type FC, type MouseEventHandler, useState, useEffect } from "react";

interface ModalUploadFileProps {
	file: File;
}

const fetcher = async (search: string) => {
	const friends = await CoworkersService.getFriends({ name_like: search });

	return friends;
};

const maxSelectedFriend = 10;

// TODO: Решить проблему выбора даты не из интервала (0,7)
const ModalUploadFile: FC<ModalUploadFileProps & ModalProps> = ({ file, onClose }) => {
	const [endDate, setEndDate] = useState<string>(cropISODate(new Date(), 7));
	const [disabled, setDisabled] = useState<boolean>(false);
	const [deleteFriend, setDeleteFriend] = useState<string>("");
	const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
	const { setIsModalUpload, setUploadFile } = useUploadDownloadFileStore();

	const [search, setSearch] = useState<string>("");
	const {
		data: friends = [],
		isLoading,
		mutate,
	} = useSWR([KEYS_SWR.FRIENDS, search], ([_, search]) => fetcher(search), {
		revalidateOnFocus: false,
	});

	useDisableScroll();

	const searchFriend = (values: FormValuesSearch) => {
		if (search !== values.name_like) {
			setSearch(values.name_like);
		} else {
			mutate();
		}
	};

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
		setUploadFile({ file: file, selectedFriends: selectedFriends, endDate: endDate });
		onClose();
		setIsModalUpload(true);
	};

	useEffect(() => {
		if (selectedFriends.length === maxSelectedFriend) {
			setDisabled(true);
			return;
		}

		setDisabled(false);
	}, [selectedFriends]);

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
						submitInput={searchFriend}
					/>
					<div className={styles.select_friends}>
						<div className={styles.my_friends}>
							<h3 className={styles.subtitle}>Ваши коллеги</h3>
							<div
								className={styles.list_my_friends}
								onClick={clickListFriends}
							>
								{isLoading && <Loader />}
								{friends.length !== 0 &&
									friends.map(({ login }, i) => (
										<Checkbox
											key={i}
											className={styles.checkbox_friend}
											value={login}
											checked={deleteFriend === login ? false : undefined}
											disabled={disabled}
										/>
									))}
								{!isLoading && friends.length === 0 && (
									<p className={styles.empty}>Нет коллег...</p>
								)}
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
									<p className={styles.warning}>Выбрано максимальное количество!</p>
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
