"use client";

import styles from "./UserActions.module.scss";
import useUserStore from "@/stores/useUserStore.store";
import PortalModals from "@/components/modals/PortalModals/PortalModals";
import ModalProfile from "@/components/modals/ModalProfile/ModalProfile";
import ToastDownloadFiles from "@/components/popups/ToastDownloadFiles/ToastDownloadFiles";
import useUploadDownloadFileStore from "@/stores/useUploadDownloadFileStore";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

const UserActions: FC = () => {
	const router = useRouter();
	const { user, isLoading } = useUserStore();
	const [isModalProfile, setIsModalProfile] = useState<boolean>(false);
	const {
		isModalDownload,
		downloadFile,
		setIsModalDownload,
		uploadFile,
		isModalUpload,
		setIsModalUpload,
	} = useUploadDownloadFileStore();

	const clickAvatar = () => {
		setIsModalProfile(true);
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

			<PortalModals isOpen={isModalProfile}>
				<ModalProfile onClose={() => setIsModalProfile(false)} />
			</PortalModals>

			<PortalModals isOpen={isModalDownload}>
				<ToastDownloadFiles
					file={downloadFile}
					onClose={() => setIsModalDownload(false)}
				/>
			</PortalModals>

			<PortalModals isOpen={isModalUpload}>
				<ToastDownloadFiles
					file={uploadFile}
					isDownload={false}
					location={{ bottom: 10, right: 10 }}
					onClose={() => setIsModalUpload(false)}
				/>
			</PortalModals>
		</>
	);
};

export default UserActions;
