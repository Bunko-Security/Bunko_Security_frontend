"use client";

import styles from "./UserActions.module.scss";
import useUserStore from "@/stores/useUserStore.store";
import PortalModals from "@/components/modals/PortalModals/PortalModals";
import ModalProfile from "@/components/modals/ModalProfile/ModalProfile";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

const UserActions: FC = () => {
	const router = useRouter();
	const { user, isLoading } = useUserStore();
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
				{user || isLoading ? (
					<div
						className={styles.avatar}
						onClick={clickAvatar}
					>
						{isLoading && <div className={`${styles.img_loading} avatar`} />}

						{user && !isLoading && (
							<img
								className="avatar"
								src={user.avatar_path || "/avatar.png"}
								alt=""
								width="60"
								height="60"
							/>
						)}
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
