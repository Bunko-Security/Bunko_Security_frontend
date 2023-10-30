import styles from "./layout.module.scss";
import { FC, PropsWithChildren } from "react";

const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
	return <main className={styles.main}>{children}</main>;
};

export default ProfileLayout;
