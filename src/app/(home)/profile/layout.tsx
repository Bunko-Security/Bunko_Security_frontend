import styles from "./layout.module.scss";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Мой профиль | Bunko Security",
};

const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
	return <main className={styles.main}>{children}</main>;
};

export default ProfileLayout;
