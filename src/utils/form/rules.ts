import { MESSAGE_ERROR } from "./messageError";

export const RULES_LOGIN = {
	required: MESSAGE_ERROR.REQUIRED,
	pattern: {
		value: new RegExp(/^[a-zA-Z\d]+$/),
		message: MESSAGE_ERROR.ONLY_LATIN_AND_NUMBERS,
	},
};

export const RULES_FULL_NAME = {
	required: MESSAGE_ERROR.REQUIRED,
	pattern: {
		value: new RegExp(/^[a-zA-Zа-яА-Яё\-\s]+$/),
		message: MESSAGE_ERROR.FULL_NAME,
	},
	minLength: {
		value: 6,
		message: MESSAGE_ERROR.MIN_LENGTH_FULL_NAME,
	},
};

export const RULES_PASSWORD = {
	required: MESSAGE_ERROR.REQUIRED,
	pattern: {
		value: new RegExp(/^[a-zA-Z\&\%\$\d]+$/),
		message: MESSAGE_ERROR.PASSWORD,
	},
	minLength: {
		value: 8,
		message: MESSAGE_ERROR.MIN_LENGTH_PASSWORD,
	},
};

const RULES_FORM = {
	LOGIN: RULES_LOGIN,
	FULL_NAME: RULES_FULL_NAME,
	PASSWORD: RULES_PASSWORD,
};

export default RULES_FORM;
