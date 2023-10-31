import styles from "./Input.module.scss";
import ErrorMessages from "@/components/messages/ErrorMessages/ErrorMessages";
import { UseFormRegisterReturn } from "react-hook-form";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	textLabel?: string;
	error?: string;
	register?: UseFormRegisterReturn<any>;
}

const Input: FC<InputProps> = ({ register, error, textLabel, className = "", ...props }) => {
	return (
		<div className={`${className} ${styles.input}`}>
			<label>
				{textLabel && <span>{textLabel}</span>}
				<input
					{...props}
					{...register}
				/>
			</label>
			{error && <ErrorMessages text={error} />}
		</div>
	);
};

export default Input;
