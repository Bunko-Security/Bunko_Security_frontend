import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";
import Header from "@/components/main/Header/Header";

export const metadata: Metadata = {
	title: "Bunko Security",
};

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default HomeLayout;
