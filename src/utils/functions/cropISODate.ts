export const cropISODate = (date: Date, countDay?: number): string => {
	if (countDay) {
		date.setDate(date.getDate() + countDay);
	}
	return date.toISOString().split("T")[0];
};
