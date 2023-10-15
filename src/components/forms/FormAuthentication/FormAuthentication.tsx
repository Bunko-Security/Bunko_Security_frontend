import styles from "./FormAuthentication.module.scss";
import { FC, FormEventHandler, ReactNode } from "react";

interface FormAuthentication {
	children?: ReactNode;
	textBtn: string;
	textTitle: string;
	onSubmit: FormEventHandler<HTMLFormElement>;
}

const FormAuthentication: FC<FormAuthentication> = ({ children, textBtn, textTitle, onSubmit }) => {
	return (
		<form
			className={styles.form_authentication}
			onSubmit={onSubmit}
		>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>{textTitle}</h2>
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

export default FormAuthentication;
