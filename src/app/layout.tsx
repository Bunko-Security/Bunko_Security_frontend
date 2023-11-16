import "./globals.scss";
import UserStoreInitial from "@/components/UserStoreInitial/UserStoreInitial";
import ResizeWindowWrapper from "@/components/wrappers/ResizeWindowWrapper/ResizeWindowWrapper";
import { FC, type PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bunko Security",
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<html lang="ru">
			<head>
				<link
					rel="icon"
					href="favicon/favicon.ico"
				/>
			</head>
			<body>
				<div
					id="modals"
					style={{ position: "relative", zIndex: 1000 }}
				/>
				// * Инициализация пользователя при загрузке сайта
				<UserStoreInitial />
				// * Передача информации об изменении размера окна
				<ResizeWindowWrapper>{children}</ResizeWindowWrapper>
			</body>
		</html>
	);
};

export default RootLayout;
