"use client";

import styles from "./InputSearch.module.scss";
import IconClear from "/public/icon-close.svg";
import IconSearch from "/public/icon-search.svg";
import { useForm } from "react-hook-form";
import type { CSSProperties, ChangeEventHandler, FC, InputHTMLAttributes } from "react";

export type FormValuesSearch = {
  name_like: string
} 

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
	style?: CSSProperties;
	textLabel?: string;
	submitInput: (values: FormValuesSearch) => void;
}

const InputSearch: FC<InputSearchProps> = ({
	textLabel,
	style,
	submitInput,
	...props
}) => {
	const { register, handleSubmit, reset } = useForm<FormValuesSearch>();

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		props.onChange?.(e);
	};

	const onSubmit = (values: FormValuesSearch) => {
		submitInput?.(values);
	};

	return (
		<form
			className={styles.form_search}
			style={style}
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
						{...register("name_like", {
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
