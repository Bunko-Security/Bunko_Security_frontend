"use client";

import styles from "./UserActions.module.scss";
import Image from "next/image";
import PortalModals from "@/components/PortalModals/PortalModals";
import ModalProfile from "@/components/modals/ModalProfile/ModalProfile";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const UserActions: FC = () => {
	const router = useRouter();
	const [hasUser, setHasUser] = useState<boolean>(true);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const clickAvatar = () => {
		setIsOpenModal(true);
	};

	const handleLogin = () => {
		router.push(ROUTES.LOGIN);
	};
	const handleRegister = () => {
		router.push(ROUTES.REGISTER);
	};

	return (
		<>
			<div className={styles.user_actions}>
				{hasUser ? (
					<div
						className={styles.avatar}
						onClick={clickAvatar}
					>
						<Image
							src="/avatar.png"
							alt=""
							width="60"
							height="60"
						/>
					</div>
				) : (
					<div className={styles.buttons}>
						<button
							className={styles.bnt_login}
							onClick={handleLogin}
						>
							Войти
						</button>
						<button
							className={styles.bnt_register}
							onClick={handleRegister}
						>
							Регистрация
						</button>
					</div>
				)}
			</div>

			<PortalModals isOpen={isOpenModal}>
				<ModalProfile onClose={() => setIsOpenModal(false)} />
			</PortalModals>
		</>
	);
};

export default UserActions;
