"use client";

import { ResizeContext } from "../contexts";
import { useResizeWindow } from "@/hooks/useResizeWindow";
import { FC, PropsWithChildren } from "react";

/* 
  Контейнер для обволакивания приложения ради 
  внесения изменения высоты window на всех уровнях
  приложения.
  
  WARNING: Может быть в скором времени удалён.

  На данный момент используется ради хука useDisableScroll.
*/

const ResizeWindowWrapper: FC<PropsWithChildren> = ({ children }) => {
	const isResize = useResizeWindow();

	return <ResizeContext.Provider value={isResize}>{children}</ResizeContext.Provider>;
};

export default ResizeWindowWrapper;
