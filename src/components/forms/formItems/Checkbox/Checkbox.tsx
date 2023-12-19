import styles from "./Checkbox.module.scss";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { FC, InputHTMLAttributes } from "react";

interface CheckboxProps {
	register?: UseFormRegisterReturn<any>;
}

const Checkbox: FC<CheckboxProps & InputHTMLAttributes<HTMLInputElement>> = ({
	register,
	style,
	className,
	value,
	...props
}) => {
	return (
		<label
			className={`${styles.label} ${className}`}
			style={{ ...style, ...(props.disabled && { pointerEvents: "none" }) }}
		>
			<input
				className={styles.checkbox}
				type="checkbox"
				{...props}
				{...register}
			/>
			<span className={styles.custom_checkbox} />
			<span className={styles.checkbox_text}>{value}</span>
		</label>
	);
};

export default Checkbox;
