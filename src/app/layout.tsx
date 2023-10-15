import "./globals.scss";
import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bunko Security",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="ru">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
