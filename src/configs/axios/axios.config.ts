import Cookies from "js-cookie";
import { COOKIES } from "@/utils/keysName";
import { type IToken } from "@/models/user.model";
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
		const refreshToken = Cookies.get(COOKIES.REFRESH_TOKEN);

		const originalRequest = error.config!;
		originalRequest._isRetry = false;

		if (error.response?.status === 401 && refreshToken && !originalRequest._isRetry) {
			originalRequest._isRetry = true;

			await axios.get<IToken>(`${process.env.SERVER_URL}/auth/refresh`, {
				withCredentials: true,
			});
			return await apiWithAuth(originalRequest);
		}

		throw error;
	},
);

export default apiWithAuth;
