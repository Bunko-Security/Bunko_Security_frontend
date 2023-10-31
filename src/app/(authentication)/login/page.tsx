"use client";

import styles from "./page.module.scss";
import Input from "@/components/forms/Input/Input";
import FormBase from "@/components/forms/FormBase/FormBase";
import RULES_FORM from "@/utils/form/rules";
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

	const onSubmit = (values: FormValues) => {
		console.log(values);
		reset();
	};

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

export default Login;
