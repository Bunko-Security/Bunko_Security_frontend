import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
	baseURL: "https://api.escuelajs.co/api/v1",
};

const APIv1 = axios.create(axiosConfig);

export default APIv1;