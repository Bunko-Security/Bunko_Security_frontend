"use client";

import styles from "./ModalProfile.module.scss";
import Link from "next/link";
import IconClose from "/public/icon-close.svg";
import useUserStore from "@/stores/useUserStore.store";
import { useRouter } from "next/navigation";
import type { ModalProps } from "@/types/ModalProps.type";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { PRIVATE_ROUTES, ROUTES } from "@/utils/routes";
import { motion, AnimatePresence } from "framer-motion";
import { type FC, type MouseEventHandler } from "react";

const ModalProfile: FC<ModalProps> = ({ onClose }) => {
	const router = useRouter();
	const { user, logout } = useUserStore();

	useDisableScroll();

	const handleLogout = () => {
		logout();
		onClose();
		router.replace(ROUTES.HOME);
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
								src={user?.avatar_path || "/avatar.png"}
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
							<li onClick={handleLogout}>Выйти</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ModalProfile;
