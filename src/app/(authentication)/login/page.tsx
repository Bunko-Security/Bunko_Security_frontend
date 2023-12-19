"use client";

import styles from "./page.module.scss";
import Input from "@/components/forms/formItems/Input/Input";
import FormBase from "@/components/forms/FormBase/FormBase";
import RULES_FORM from "@/utils/form/rules";
import useUserStore from "@/stores/useUserStore.store";
import { ROUTES } from "@/utils/routes";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import type { NextPage } from "next";
import type { ILoginUser } from "@/models/user.model";

const LoginPage: NextPage = () => {
	const { loginUser, user } = useUserStore();

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<ILoginUser>({ mode: "onChange" });

	const onSubmit = async (values: ILoginUser) => {
		await loginUser(values);
		reset();
	};

	useEffect(() => {
		if (user) {
			redirect(ROUTES.HOME);
		}
	}, [user]);

	return (
		<div className={styles.login_form}>
			<FormBase
				textBtn="Войти"
				textTitle="Вход"
				onSubmit={handleSubmit(onSubmit)}
			>
				<>
					<Input
						className={styles.input_field}
						register={register("login", RULES_FORM.LOGIN)}
						autoComplete="on"
						placeholder="Логин"
						error={errors.login?.message}
					/>

					<Input
						className={styles.input_field}
						register={register("password", RULES_FORM.PASSWORD)}
						type="password"
						autoComplete="on"
						placeholder="Пароль"
						error={errors.password?.message}
					/>
				</>
			</FormBase>
		</div>
	);
};

export default LoginPage;
