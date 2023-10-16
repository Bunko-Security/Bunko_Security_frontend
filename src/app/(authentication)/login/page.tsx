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
	} = useForm<FormValues>({ mode: "onChange" });

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
							required: "Поле является обязательным!",
							pattern: {
								value: new RegExp(/^[a-zA-Z\d]+$/),
								message: "Только буквы латинского алфавита и цифры!",
							},
						})}
						autoComplete="on"
						placeholder="Логин"
					/>
					{errors?.login && <ErrorMessages text={errors.login.message} />}
				</div>

				<div className={styles.input_field}>
					<input
						{...register("password", {
							required: "Поле является обязательным!",
							pattern: {
								value: new RegExp(/^[a-zA-Z\&\%\$\d]+$/),
								message: "Только буквы латинского алфавита, цифры и %, &, $!",
							},
              minLength: {
                value: 8,
								message: "Пароль должен содержать не менее 8 символов!",
              }
						})}
						type="password"
						autoComplete="on"
						placeholder="Пароль"
					/>
					{errors?.password && <ErrorMessages text={errors.password.message} />}
				</div>
			</div>
		</FormAuthentication>
	);
};

export default Login;
