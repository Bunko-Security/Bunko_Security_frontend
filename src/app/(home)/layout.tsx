import Header from "@/components/main/Header/Header";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

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
