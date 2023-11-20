import styles from "./Checkbox.module.scss";
import type { FC, InputHTMLAttributes } from "react";

const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({ style, className, ...props }) => {
	return (
		<label
			className={`${styles.label} ${className}`}
			style={{ ...style, ...(props.disabled && { cursor: "not-allowed" }) }}
		>
			<input
				className={styles.checkbox}
				type="checkbox"
				{...props}
			/>
			<span className={styles.custom_checkbox} />
			<span className={styles.checkbox_text}>Петров И.В.</span>
		</label>
	);
};

export default Checkbox;
