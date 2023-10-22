"use client";

import styles from "./InputSearch.module.scss";
import IconSearch from "/public/icon-search.svg";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ChangeEventHandler, FC, InputHTMLAttributes, useRef, useState } from "react";

type FormValues = {
	file_name: string;
};

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
	marginBottom?: string | number;
}

const InputSearch: FC<InputSearchProps> = ({ marginBottom, ...props }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [showSearch, setShowSearch] = useState<boolean>(false);
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
		if (value.length) {
			formRef.current!.style.boxShadow = "0 0 5px 1px var(--violet-dark)";
			setShowSearch(true);
		} else {
			formRef.current!.style.boxShadow = "none";
			setShowSearch(false);
		}
	};

	const handleClickInput = () => {
		formRef.current!.style.boxShadow = "0 0 5px 1px var(--violet-dark)";
		setShowSearch(true);
	};

	const handleClickOverlay = () => {
		formRef.current!.style.boxShadow = "none";
		setShowSearch(false);
	};

	const onSubmit = (values: FormValues) => {
		formRef.current!.style.boxShadow = "none";
		console.log(values);
		setShowSearch(false);
		reset();
	};

	return (
		<>
			<AnimatePresence>
				{showSearch && (
					<motion.div
						className={styles.overlay}
						onClick={handleClickOverlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15, ease: "linear" }}
					/>
				)}
			</AnimatePresence>

			<form
				ref={formRef}
				className={styles.form_search}
				style={{ marginBottom }}
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					{...register("file_name", {
						onChange: onChange,
					})}
					className={styles.input}
					type="search"
					autoComplete="off"
					onClick={handleClickInput}
					{...props}
				/>
				<button
					type="submit"
					className={styles.button}
				>
					<IconSearch className={styles.icon_search} />
				</button>

				{showSearch && (
					<div className={styles.search_result}>
						<div>Efwefwef</div>
					</div>
				)}
			</form>
		</>
	);
};

export default InputSearch;
