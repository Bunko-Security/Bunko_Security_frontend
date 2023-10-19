import Header from "@/components/main/Header/Header";
import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

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
