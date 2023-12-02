"use client";

import styles from "./ModalProfile.module.scss";
import Link from "next/link";
import IconClose from "/public/icon-close.svg";
import useUserStore from "@/stores/useUserStore.store";
import { PRIVATE_ROUTES, ROUTES } from "@/utils/routes";
import type { ModalProps } from "@/types/ModalProps.type";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { motion, AnimatePresence } from "framer-motion";
import type { FC, MouseEventHandler } from "react";

const ModalProfile: FC<ModalProps> = ({ onClose }) => {
	const { user } = useUserStore();

	useDisableScroll();

	const handleLogOut = () => {
		onClose();
	};

	const handleCloseModal: MouseEventHandler<HTMLUListElement> = (event) => {
		const element = event.target as HTMLUListElement;

		if (element.tagName === "A") {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 0.2, ease: "circIn" } }}
				exit={{ opacity: 0, transition: { duration: 0, ease: "linear" } }}
			>
				<div
					className="overlay"
					onClick={onClose}
				/>
				<div className={styles.modal}>
					<div className={styles.header}>
						<div className={styles.user_info}>
							<img
								className="avatar"
								src={user!.avatar || "/avatar.png"}
								alt=""
								width="28"
								height="28"
							/>
							<span>{user!.username}</span>
						</div>

						<IconClose
							className={styles.icon_close}
							onClick={onClose}
						/>
					</div>

					<div className={styles.menu}>
						<ul
							onClick={handleCloseModal}
							className={styles.menu_list}
						>
							<li>
								<Link href={`${PRIVATE_ROUTES.PROFILE}`}>Мой профиль</Link>
							</li>
							<li>
								<Link href={`${PRIVATE_ROUTES.FRIENDS}`}>Мои друзья</Link>
							</li>
							<li>
								<Link href={`${PRIVATE_ROUTES.MY_FILES}`}>Мои файлы</Link>
							</li>
							<li>
								<Link href={`${PRIVATE_ROUTES.ACCESSIBLE_FILES}`}>Доступные файлы</Link>
							</li>
							<li onClick={handleLogOut}>Выйти</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ModalProfile;
