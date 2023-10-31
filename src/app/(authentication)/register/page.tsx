"use client";

import styles from "./page.module.scss";
import Link from "next/link";
import Input from "@/components/forms/Input/Input";
import FormBase from "@/components/forms/FormBase/FormBase";
import RULES_FORM from "@/utils/form/rules";
import { ROUTES } from "@/utils/routes";
import { useForm } from "react-hook-form";
import { NextPage } from "next";

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

	const onSubmit = (values: FormValues) => {
		console.log(values);
		reset();
	};

	return (
		<div className={styles.register_form}>
			<FormBase
				textBtn="Создать аккаунт"
				textTitle="Регистрация"
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
						register={register("name_full", RULES_FORM.FULL_NAME)}
						autoComplete="on"
						placeholder="ФИО"
						error={errors.name_full?.message}
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
				<Link
					className={styles.question_link}
					href={`${ROUTES.LOGIN}`}
				>
					Уже имеете аккаунт?
				</Link>
			</FormBase>
		</div>
	);
};

export default Register;
