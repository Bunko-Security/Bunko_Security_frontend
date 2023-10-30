import "./globals.scss";
import ResizeWindowWrapper from "@/components/ResizeWindowWrapper/ResizeWindowWrapper";
import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bunko Security",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
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
				<ResizeWindowWrapper>{children}</ResizeWindowWrapper>
			</body>
		</html>
	);
};

export default RootLayout;
