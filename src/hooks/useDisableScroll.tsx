import { ResizeContext } from "@/components/contexts";
import { useContext, useEffect, useRef } from "react";

/* 
  Скрытие scroll при открытии модального окна
  и его включение при закрытии окна.
  А также при изменении размера объекта window 
  при открытии/закрытии модального окна.

  WARNING: Использовать только внутри компонента,
  представляющего из себя модальной окно! 
*/

export const useDisableScroll = () => {
	const isResize = useContext(ResizeContext);
	const resizeRef = useRef<number>(0);

	useEffect(() => {
		resizeRef.current = isResize;

		if (
			document.body.scrollHeight !== document.body.offsetHeight ||
			isResize !== resizeRef.current
		) {
			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = "16px";
		} else {
			document.body.style.overflow = "initial";
			document.body.style.paddingRight = "";
		}

		return () => {
			document.body.style.overflow = "initial";
			document.body.style.paddingRight = "";
		};

	}, [isResize]);
};
