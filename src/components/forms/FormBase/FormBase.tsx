import styles from "./FormBase.module.scss";
import type { CSSProperties, FC, FormEventHandler, ReactNode } from "react";

interface FormBaseProps {
	children?: ReactNode;
	textBtn: string;
	textTitle?: string;
	onSubmit: FormEventHandler<HTMLFormElement>;
	style?: CSSProperties;
	className?: string;
}

const FormBase: FC<FormBaseProps> = ({
	children,
	textBtn,
	textTitle,
	onSubmit,
	style,
	className = "",
}) => {
	return (
		<form
			className={`${styles.form_authentication} ${className}`}
			onSubmit={onSubmit}
			style={style}
		>
			{textTitle && <h2 className={styles.title}>{textTitle}</h2>}
			<div className={styles.wrapper}>{children}</div>
			<button
				className={styles.button}
				type="submit"
			>
				{textBtn}
			</button>
		</form>
	);
};

export default FormBase;
