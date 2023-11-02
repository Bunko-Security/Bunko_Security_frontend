"use client";

import styles from "./InputSearch.module.scss";
import IconClear from "/public/icon-close.svg";
import IconSearch from "/public/icon-search.svg";
import { useForm } from "react-hook-form";
import { ChangeEventHandler, FC, InputHTMLAttributes } from "react";

type FormValues = {
	file_name: string;
};

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
	marginBottom?: string | number;
	textLabel?: string;
}

const InputSearch: FC<InputSearchProps> = ({ marginBottom, textLabel, ...props }) => {
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {};

	const onSubmit = (values: FormValues) => {
		console.log(values);
		reset();
	};

	return (
		<form
			className={styles.form_search}
			style={{ marginBottom }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<label
				htmlFor="input_search"
				className={styles.label}
			>
				{textLabel && <span>{textLabel}</span>}
			</label>

			<div className={styles.input_search}>
				<div className={styles.input_wrapper}>
					<input
						{...register("file_name", {
							onChange: onChange,
						})}
						type="search"
						autoComplete="off"
						id="input_search"
						{...props}
					/>
					<span
						className={styles.icon_clear}
						onClick={() => reset()}
					>
						<IconClear />
					</span>
				</div>

				<button
					type="submit"
					className={styles.button}
				>
					<IconSearch className={styles.icon_search} />
				</button>
			</div>
		</form>
	);
};

export default InputSearch;
