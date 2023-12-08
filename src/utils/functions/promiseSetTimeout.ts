export const promiseSetTimeout = (callback: () => void, delay: number): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(callback());
		}, delay);
	});
