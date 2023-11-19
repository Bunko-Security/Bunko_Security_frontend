"use client";

import styles from "./ModalForwardFile.module.scss";
import Tag from "@/components/Tag/Tag";
import Checkbox from "@/components/forms/formItems/Checkbox";
import InputSearch from "@/components/forms/InputSearch/InputSearch";
import { FC } from "react";
import type { ModalProps } from "@/types/ModalProps.type";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { AnimatePresence, motion } from "framer-motion";

const ModalForwardFile: FC<ModalProps> = ({ onClose }) => {
	useDisableScroll();

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2, ease: "circIn" }}
			>
				<div
					className="overlay"
					onClick={onClose}
				/>
				<div className={styles.forward}>
					<h1 className={styles.title}>Переслать файл</h1>
					<InputSearch
						textLabel="Поиск по имени"
						placeholder="Логин"
					/>

					<div className={styles.select_friends}>
						<div className={styles.my_friends}>
							<h3 className={styles.subtitle}>Ваши друзья</h3>
							<div className={styles.list_my_friends}>
								{Array.from({ length: 10 }).map((_, i) => (
									<Checkbox
										key={i}
										className={styles.checkbox_friend}
									/>
								))}
								{Array.from({ length: 5 }).map((_, i) => (
									<Checkbox
										key={i}
										className={styles.checkbox_friend}
										disabled
									/>
								))}
							</div>
						</div>

						<div className={styles.selected_friends}>
							<h3 className={styles.subtitle}>Выбранные</h3>
							<div className={styles.list_selected_friends}>
								{Array.from({ length: 7 }).map((_, i) => (
									<Tag
										key={i}
										text="Петров И.В."
									/>
								))}
								{Array.from({ length: 5 }).map((_, i) => (
									<Tag
										key={i}
										text="Чёрный плащ И.В."
									/>
								))}
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
						<button className={styles.forward_btn}>Отправить</button>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ModalForwardFile;
