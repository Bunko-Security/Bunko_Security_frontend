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
	} = useForm<FormValues>({ mode: "onChange" });

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
						{...register("name_full", {
							required: "Поле является обязательным!",
							pattern: {
								value: new RegExp(/^[a-zA-Zа-яА-Яё\-\s]+$/),
								message: "Только буквы, тире и пробелы!",
							},
							minLength: {
								value: 6,
								message: "Полное имя должно содержать не менее 6 символов!",
							},
						})}
						autoComplete="on"
						placeholder="ФИО"
					/>
					{errors?.name_full && <ErrorMessages text={errors.name_full.message} />}
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
							},
						})}
						type="password"
						autoComplete="on"
						placeholder="Пароль"
					/>
					{errors?.password && <ErrorMessages text={errors.password.message} />}
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
