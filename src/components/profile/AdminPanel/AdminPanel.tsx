"use client";

import styles from "./AdminPanel.module.scss";
import useUserStore from "@/stores/useUserStore.store";
import FormRegister from "@/components/forms/FormRegister/FormRegister";
import AdminUserList from "./AdminUserList/AdminUserList";
import { ROUTES } from "@/utils/routes";
import { redirect } from "next/navigation";
import { useState, type FC, useEffect } from "react";

const AdminPanel: FC = () => {
	const { user } = useUserStore();
	const [isRegisterUser, setIsRegisterUser] = useState<boolean>(false);
	const [isListUsers, setIsListUsers] = useState<boolean>(true);

	const handlerRegisterUser = () => {
		setIsListUsers(false);
		setIsRegisterUser(true);
	};

	const handlerListUsers = () => {
		setIsRegisterUser(false);
		setIsListUsers(true);
	};

	useEffect(() => {
		if (!user?.is_admin) {
			redirect(ROUTES.HOME);
		}
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<h2 className={styles.title}>Функции</h2>
				<div className={styles.buttons}>
					<button onClick={handlerListUsers}>Список сотрудников</button>
					<button onClick={handlerRegisterUser}>Добавить сотрудника</button>
				</div>
			</div>
			<div className={styles.right}>
				{isRegisterUser && <FormRegister className={styles.form_register} />}
				{isListUsers && (
					<div className={styles.list_users}>
						<h2>Список сотрудников</h2>
						<AdminUserList />
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminPanel;
