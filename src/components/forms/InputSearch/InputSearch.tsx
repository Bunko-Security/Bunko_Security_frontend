"use client";

import styles from "./InputSearch.module.scss";
import IconSearch from "/public/icon-search.svg";
import { useForm } from "react-hook-form";
import { ChangeEventHandler, FC, InputHTMLAttributes, useRef } from "react";

type FormValues = {
	file_name: string;
};

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
	marginBottom?: string | number;
	textLabel?: string;
}

const InputSearch: FC<InputSearchProps> = ({ marginBottom, textLabel, ...props }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
		if (value.length) {
		}
	};

	const onSubmit = (values: FormValues) => {
		console.log(values);
		reset();
	};

	return (
		<>
			<form
				ref={formRef}
				className={styles.form_search}
				style={{ marginBottom }}
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className={styles.label}>
					{textLabel && <span>{textLabel}</span>}
					<div className={styles.search}>
						<input
							{...register("file_name", {
								onChange: onChange,
							})}
							className={styles.input}
							type="search"
							autoComplete="off"
							{...props}
						/>
						<button
							type="submit"
							className={styles.button}
						>
							<IconSearch className={styles.icon_search} />
						</button>
					</div>
				</label>
			</form>
		</>
	);
};

export default InputSearch;
