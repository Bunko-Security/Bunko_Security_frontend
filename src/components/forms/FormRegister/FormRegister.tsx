"use client";

import styles from "./FormRegister.module.scss";
import Input from "@/components/forms/formItems/Input/Input";
import Checkbox from "../formItems/Checkbox/Checkbox";
import FormBase from "@/components/forms/FormBase/FormBase";
import RULES_FORM from "@/utils/form/rules";
import AdminService from "@/services/admin.service";
import { useForm } from "react-hook-form";
import { type FC } from "react";
import { AuthModule } from "@/utils/encrypt/auth.module";
import { LOCAL_STORAGE } from "@/utils/keysName";
import type { IRegisterUser } from "@/models/user.model";

interface FormRegisterProps {
	className?: string;
}

const FormRegister: FC<FormRegisterProps> = ({ className }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IRegisterUser>({ mode: "onChange" });

	const onSubmit = async (values: IRegisterUser) => {
		const hashData = AuthModule.createHash(values.login, values.password);
		const RSAKeys = AuthModule.genRSAKey(hashData.hashEncrypt);

		localStorage.setItem(LOCAL_STORAGE.HASH_ENCRYPT, hashData.hashEncrypt);

		await AdminService.registerUser({
			pub_key: RSAKeys.publicKey,
			priv_key: RSAKeys.privateKey,
			hash_key: hashData.keyHash,
			auth_hash: hashData.hashAuth,
			login: values.login,
			username: values.username,
			is_admin: values.is_admin,
		});

		reset();
	};

	return (
		<FormBase
			className={className}
			textBtn="Создать сотрудника"
			textTitle="Регистрация сотрудника"
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
				<Checkbox
					className={styles.checkbox}
					value="Администратор"
					register={register("is_admin")}
				/>
			</>
		</FormBase>
	);
};

export default FormRegister;
