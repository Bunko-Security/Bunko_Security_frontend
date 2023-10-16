"use client";

import styles from "./ModalProfile.module.scss";
import Link from "next/link";
import Image from "next/image";
import IconClose from "/public/icon-close.svg";
import PortalModals from "@/components/PortalModals/PortalModals";
import { ROUTES } from "@/utils/routes";
import { FC, MouseEventHandler } from "react";

interface ModalProfileProps {
	isOpen: boolean;
	onClose: () => void;
}

const ModalProfile: FC<ModalProfileProps> = ({ isOpen, onClose }) => {
	const handleLogOut = () => {
		onClose();
	};

	const handleCloseModal: MouseEventHandler<HTMLUListElement> = (event) => {
		const element = event.target as HTMLUListElement;

		console.log(element);

		if (element.tagName === "A") {
			onClose();
		}
	};

	return (
		<PortalModals>
			{isOpen && (
				<>
					<div
						className={styles.overlay}
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
				</>
			)}
		</PortalModals>
	);
};

export default ModalProfile;
