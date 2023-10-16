import styles from "./layout.module.scss";
import { FC, PropsWithChildren } from "react";

const AuthenticationLayout: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.wrapper}>{children}</div>;
};

export default AuthenticationLayout;
