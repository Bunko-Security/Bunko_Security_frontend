import styles from "./FormBase.module.scss";
import { CSSProperties, FC, FormEventHandler, ReactNode } from "react";

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
			<div className={styles.wrapper}>
				{textTitle && <h2 className={styles.title}>{textTitle}</h2>}
				{children}
			</div>
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
