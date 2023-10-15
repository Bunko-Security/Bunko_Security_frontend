"use client";

import styles from "./page.module.scss";
import Link from "next/link";
import ErrorMessages from "@/components/messages/ErrorMessages/ErrorMessages";
import FormAuthentication from "@/components/forms/FormAuthentication/FormAuthentication";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import { ROUTES } from "@/utils/routes";

type FormValues = {
	login: string;
	name_full: string;
	password: string;
};

const Register: NextPage = () => {
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
			textBtn="Создать аккаунт"
			textTitle="Регистрация"
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
						{...register("name_full", {
							required: true,
							pattern: RegExp(/^[a-zA-Zа-яА-Яё\-\s]+$/),
						})}
						autoComplete="on"
						placeholder="ФИО"
					/>
					{errors?.name_full && <ErrorMessages />}
				</div>

				<div className={styles.input_field}>
					<input
						{...register("password", {
							required: true,
							pattern: RegExp(/^[a-zA-Zа-яА-Яё\-\s]+$/),
						})}
						type="password"
						autoComplete="on"
						placeholder="Пароль"
					/>
					{errors?.password && <ErrorMessages />}
				</div>
			</div>
			<Link
				className={styles.question_link}
				href={`${ROUTES.LOGIN}`}
			>
				Уже имеете аккаунт?
			</Link>
		</FormAuthentication>
	);
};

export default Register;
