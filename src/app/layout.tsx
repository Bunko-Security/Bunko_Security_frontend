import "./globals.scss";
import UserStoreInitial from "@/components/UserStoreInitial/UserStoreInitial";
import ResizeWindowWrapper from "@/components/wrappers/ResizeWindowWrapper/ResizeWindowWrapper";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Bunko Security",
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<html lang="ru">
			<head>
				<link
					rel="shortcut icon"
					href="/favicon/favicon.ico"
					type="image/x-icon"
				/>
			</head>
			<body>
				<div
					id="modals"
					style={{ position: "relative", zIndex: 1000 }}
				/>
				<UserStoreInitial />
				<ResizeWindowWrapper>{children}</ResizeWindowWrapper>
			</body>
		</html>
	);
};

export default RootLayout;
