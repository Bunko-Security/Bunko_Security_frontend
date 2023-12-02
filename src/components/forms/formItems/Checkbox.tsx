import styles from "./Checkbox.module.scss";
import type { FC, InputHTMLAttributes } from "react";

const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({
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
			/>
			<span className={styles.custom_checkbox} />
			<span className={styles.checkbox_text}>{value}</span>
		</label>
	);
};

export default Checkbox;
