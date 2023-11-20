import styles from "./Loader.module.scss";
import type { CSSProperties, FC } from "react";

interface LoaderProps {
	style?: CSSProperties;
}

const Loader: FC<LoaderProps> = ({ style }) => {
	return (
		<div
			className={styles.loader_container}
			style={style}
		>
			<div className={styles.loader} />
		</div>
	);
};

export default Loader;
