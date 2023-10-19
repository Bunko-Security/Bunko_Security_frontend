import styles from "./InputSearch.module.scss";
import IconSearch from "/public/icon-search.svg";
import { FC, InputHTMLAttributes } from "react";

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
	marginBottom?: string | number;
}

const InputSearch: FC<InputSearchProps> = ({ marginBottom, ...props }) => {
	return (
		<form
			className={styles.form_search}
			style={{ marginBottom }}
		>
			<input
				className={styles.input}
				type="search"
				autoComplete="off"
				name="search"
				{...props}
			/>
			<button
				type="submit"
				className={styles.button}
			>
				<IconSearch className={styles.icon_search} />
			</button>
		</form>
	);
};

export default InputSearch;
