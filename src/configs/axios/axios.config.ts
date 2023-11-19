import Cookies from "js-cookie";
import { type IToken } from "@/models/user.model";
import { COOKIES, LOCAL_STORAGE } from "@/utils/keysName";
import axios, { type AxiosRequestConfig } from "axios";

// * Конфигурация для запросов к защищённым маршрутам

const axiosConfig: AxiosRequestConfig = {
	withCredentials: true,
	baseURL: process.env.SERVER_URL,
};

const apiWithAuth = axios.create(axiosConfig);

apiWithAuth.interceptors.request.use(async (config) => {
	config.headers.Authorization = `Bearer ${Cookies.get(COOKIES.ACCESS_TOKEN)}`;

	return config;
});

apiWithAuth.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config!;
		originalRequest._isRetry = false;

		if (error.response?.status === 401 && !originalRequest._isRetry) {
			originalRequest._isRetry = true;

			await axios
				.get<IToken>(`${process.env.SERVER_URL}/auth/refresh`, {
					withCredentials: true,
				})
				.catch(() => {
					localStorage.removeItem(LOCAL_STORAGE.IS_LOGIN);
				});
			return await apiWithAuth(originalRequest);
		}

		throw error;
	},
);

export default apiWithAuth;
