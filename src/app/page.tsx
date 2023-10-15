"use client";

import { ROUTES } from "@/utils/routes";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const App: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push(ROUTES.HOME);
	}, []);
	return <></>;
};

export default App;
