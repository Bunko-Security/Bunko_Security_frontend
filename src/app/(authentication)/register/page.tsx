"use client";

import styles from "./page.module.scss";
import Link from "next/link";
import Input from "@/components/forms/Input/Input";
import FormBase from "@/components/forms/FormBase/FormBase";
import RULES_FORM from "@/utils/form/rules";
import useUserStore from "@/stores/useUserStore.store";
import { ROUTES } from "@/utils/routes";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import type { NextPage } from "next";
import type { ICreateUser } from "@/models/user.model";

const Register: NextPage = () => {
	const { registerUser, user } = useUserStore();

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<ICreateUser>({ mode: "onChange" });

	const onSubmit = (values: ICreateUser) => {
		registerUser({ ...values, public_key: "1111", private_key: "1111" });
		reset();
	};

	useEffect(() => {
		if (user) {
			redirect(ROUTES.HOME);
		}
	}, [user]);

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
						register={register("username", RULES_FORM.FULL_NAME)}
						autoComplete="on"
						placeholder="ФИО"
						error={errors.username?.message}
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
