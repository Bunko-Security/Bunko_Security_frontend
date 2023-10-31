"use client";

import styles from "./FormChangeInfoUser.module.scss";
import Input from "../Input/Input";
import FormBase from "../FormBase/FormBase";
import RULES_FORM from "@/utils/form/rules";
import { FC } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
	login: string;
	full_name: string;
};

const FormChangeInfoUser: FC = () => {
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
		<FormBase
			className={styles.form}
			textBtn="Изменить"
			onSubmit={handleSubmit(onSubmit)}
		>
			<>
				<Input
					className={styles.input_field}
					register={register("login", RULES_FORM.LOGIN)}
					textLabel="Логин"
					placeholder="Логин"
					autoComplete="on"
					error={errors.login?.message}
				/>
				<Input
					className={styles.input_field}
					register={register("full_name", RULES_FORM.FULL_NAME)}
					textLabel="ФИО"
					placeholder="ФИО"
					autoComplete="on"
					error={errors.full_name?.message}
				/>
			</>
		</FormBase>
	);
};

export default FormChangeInfoUser;
