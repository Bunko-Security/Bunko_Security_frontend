import { useEffect } from "react";

/* Скрытие scroll при открытии модального окна
   и его включение при закрытии окна 
*/

export const useDisableScroll = (isOpen: boolean) => {
	useEffect(() => {
		if (document.body.scrollHeight !== document.body.offsetHeight) {
			if (isOpen) {
				document.body.style.overflow = "hidden";
				document.body.style.paddingRight = "20px";
			} else {
				document.body.style.overflow = "initial";
				document.body.style.paddingRight = "";
			}
		}
	}, [isOpen]);
};