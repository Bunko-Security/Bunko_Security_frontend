"use client";

import { ResizeContext } from "../contexts";
import { useResizeWindow } from "@/hooks/useResizeWindow";
import { FC, PropsWithChildren } from "react";

const ResizeWindowWrapper: FC<PropsWithChildren> = ({ children }) => {
	const isResize = useResizeWindow();

	return <ResizeContext.Provider value={isResize}>{children}</ResizeContext.Provider>;
};

export default ResizeWindowWrapper;
