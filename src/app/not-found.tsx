import Link from "next/link";
import styles from "./not-found.module.scss";
import { FC } from "react";
import { ROUTES } from "@/utils/routes";

const NotFound: FC = () => {
	return (
		<div className={styles.not_found}>
			<div className={styles.container}>
				<h1 className={styles.title}>
					4<span>0</span>4
				</h1>
				<p className={styles.text}>Данная страница не была найдена</p>
        <Link href={ROUTES.HOME} className={styles.link}>Вернуться</Link>
			</div>
		</div>
	);
};

export default NotFound;
