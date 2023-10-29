"use client";

import styles from "./ModalForwardFile.module.scss";
import Checkbox from "@/components/forms/formItems/Checkbox";
import InputSearch from "@/components/forms/InputSearch/InputSearch";
import PortalModals from "@/components/PortalModals/PortalModals";
import { FC } from "react";
import { ModalProps } from "@/types/ModalProps.type";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { AnimatePresence, motion } from "framer-motion";

const ModalForwardFile: FC<ModalProps> = ({ isOpen, onClose }) => {
	useDisableScroll(isOpen);

	return (
		<PortalModals>
			<AnimatePresence>
				{isOpen && (
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
										{Array.from({ length: 5 }).map((_, i) => (
											<Checkbox key={i} className={styles.checkbox_friend} />
										))}
										{Array.from({ length: 5 }).map((_, i) => (
											<Checkbox key={i} className={styles.checkbox_friend} disabled />
										))}
									</div>
								</div>

								<div className={styles.selected_friends}>
									<h3 className={styles.subtitle}>Выбранные</h3>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</PortalModals>
	);
};

export default ModalForwardFile;
