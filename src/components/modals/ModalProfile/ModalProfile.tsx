"use client";

import styles from "./ModalProfile.module.scss";
import Link from "next/link";
import Image from "next/image";
import IconClose from "/public/icon-close.svg";
import PortalModals from "@/components/PortalModals/PortalModals";
import { ROUTES } from "@/utils/routes";
import { ModalProps } from "@/types/ModalProps.type";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { FC, MouseEventHandler } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalProfile: FC<ModalProps> = ({ isOpen, onClose }) => {
  useDisableScroll(isOpen);

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
		<PortalModals>
			<AnimatePresence>
				{isOpen && (
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
									<Image
										src="/avatar.png"
										alt=""
										width="28"
										height="28"
									/>
									<span>ShuZoFreNuk</span>
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
										<Link href={`${ROUTES.PROFILE}`}>Мой профиль</Link>
									</li>
									<li>
										<Link href={`${ROUTES.FRIENDS}`}>Мои друзья</Link>
									</li>
									<li>
										<Link href={`${ROUTES.MY_FILES}`}>Мои файлы</Link>
									</li>
									<li onClick={handleLogOut}>Выйти</li>
								</ul>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</PortalModals>
	);
};

export default ModalProfile;
