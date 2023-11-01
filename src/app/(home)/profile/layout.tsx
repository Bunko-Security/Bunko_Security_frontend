import styles from "./layout.module.scss";
import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Мой профиль | Bunko Security",
};

const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
	return <main className={styles.main}>{children}</main>;
};

export default ProfileLayout;
