"use client";

import styles from "./page.module.scss";
import ErrorMessages from "@/components/messages/ErrorMessages/ErrorMessages";
import FormAuthentication from "@/components/forms/FormAuthentication/FormAuthentication";
import { useForm } from "react-hook-form";
import { NextPage } from "next";

type FormValues = {
	login: string;
	password: string;
};

const Login: NextPage = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<FormValues>({ mode: "onBlur" });

	const onSubmit = (values: any) => {
		console.log(values);
		reset();
	};

	return (
		<FormAuthentication
			textBtn="Войти"
			textTitle="Вход"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<div className={styles.input_field}>
					<input
						{...register("login", {
							required: true,
							pattern: RegExp(/^[a-zA-Z\d]+$/),
						})}
						autoComplete="on"
						placeholder="Логин"
					/>
					{errors?.login && <ErrorMessages />}
				</div>

				<div className={styles.input_field}>
					<input
						{...register("password", {
							required: true,
							pattern: new RegExp(/^[a-zA-Z\&\%\$\d]+$/),
						})}
						type="password"
						autoComplete="on"
						placeholder="Пароль"
					/>
					{errors?.password && <ErrorMessages />}
				</div>
			</div>
		</FormAuthentication>
	);
};

export default Login;
