"use client";

import styles from "./FormChangeInfoUser.module.scss";
import Input from "../formItems/Input/Input";
import FormBase from "../FormBase/FormBase";
import RULES_FORM from "@/utils/form/rules";
import useUserStore from "@/stores/useUserStore.store";
import { useForm } from "react-hook-form";
import type { FC } from "react";
import type { IUpdateUser } from "@/models/user.model";

const FormChangeInfoUser: FC = () => {
	const { updateUser } = useUserStore();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IUpdateUser>({ mode: "onChange" });

	const onSubmit = (values: IUpdateUser) => {
		updateUser(values);
		reset();
	};

	return (
		<FormBase
			className={styles.form}
			textBtn="Изменить"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				className={styles.input_field}
				register={register("new_username", RULES_FORM.FULL_NAME)}
				textLabel="Имя пользователя"
				placeholder="Имя пользователя"
				autoComplete="on"
				error={errors.new_username?.message}
			/>
		</FormBase>
	);
};

export default FormChangeInfoUser;
