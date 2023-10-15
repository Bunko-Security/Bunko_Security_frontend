import Link from "next/link";
import { ROUTES } from "@/utils/routes";
import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bunko Security",
};

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Link href={`${ROUTES.HOME}`}>ЛОГО</Link>
			{children}
		</>
	);
};

export default HomeLayout;
