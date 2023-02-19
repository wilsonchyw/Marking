import axios from "axios";

const _axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
});

export default _axios;

export const setToken = (token: string) => {
    _axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    _axios.interceptors.request.use(
        (config) => {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );
};
