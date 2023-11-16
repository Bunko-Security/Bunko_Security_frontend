import { useEffect, useState } from "react";

// * Хук для отслеживания изменения высоты окна браузера

export const useResizeWindow = () => {
	const [isResize, setIsResize] = useState<number>(0);

	useEffect(() => {
		const disableScroll = (e: Event) => {
			const target = e.target as Window;
			setIsResize(target.innerHeight);
		};

		window.addEventListener("resize", disableScroll);

		return () => {
			window.removeEventListener("resize", disableScroll);
		};
	}, []);

	return isResize;
};
