import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import UserActions from "./UserActions/UserActions";
import { ROUTES } from "@/utils/routes";
import type { FC } from "react";

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Link href={`${ROUTES.HOME}`}>
					<Image
						src="/logo/logo.svg"
						alt="LOGO"
						width="60"
						height="60"
						priority
					/>
				</Link>
				<div className={styles.left_links}>
					<Link href={`${ROUTES.HOME}`}>Главная</Link>
					<Link href={`${ROUTES.PUBLIC_FILES}`}>Публичные файлы</Link>
					<Link href={`${ROUTES.HELP}`}>Помощь</Link>
				</div>
			</div>

			<UserActions />
		</header>
	);
};

export default Header;
