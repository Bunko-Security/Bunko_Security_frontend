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
import { AuthModule } from "@/utils/encrypt/auth.module";
import { LOCAL_STORAGE } from "@/utils/keysName";
import type { NextPage } from "next";
import type { IBaseUser } from "@/models/user.model";

// TODO: Подумать над этим
type FormValues = IBaseUser & { password: string };

const Register: NextPage = () => {
	const { registerUser, user } = useUserStore();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<FormValues>({ mode: "onChange" });

	const onSubmit = (values: FormValues) => {
		const hashData = AuthModule.createHash(values.login, values.password);
		const RSAKeys = AuthModule.genRSAKey(hashData.hashEncrypt);

		localStorage.setItem(LOCAL_STORAGE.HASH_ENCRYPT, hashData.hashEncrypt);

		registerUser({
			pub_key: RSAKeys.publicKey,
			priv_key: RSAKeys.privateKey,
			hash_key: hashData.keyHash,
			auth_hash: hashData.hashAuth,
			login: values.login,
			username: values.username,
		});

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
