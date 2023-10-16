import styles from "./ErrorMessages.module.scss";
import IconWarning from "/public/icon-warning.svg";
import { FC } from "react";

interface ErrorMessagesProps {
	text?: string;
}

const ErrorMessages: FC<ErrorMessagesProps> = ({ text }) => {
	return (
		<div className={styles.message_error}>
			<IconWarning className={styles.icon_warning} />
			<p className={styles.error}> {text ? text : "Поле является обязательным!"}</p>
		</div>
	);
};

export default ErrorMessages;
