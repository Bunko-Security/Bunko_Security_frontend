import styles from "./layout.module.scss";
import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Авторизация | Bunko Security",
};

const AuthenticationLayout: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.wrapper}>{children}</div>;
};

export default AuthenticationLayout;
