import axios from "axios";
import { notificationRef } from "@/pages/_app";

export interface IfetchHandlerProps {
    endpoint: string;
    method?: string;
    data?: any;
    callback: Function | null;
}

/**
 *
 * This function is responsible for making HTTP requests to the server and handling the response.
 * @param {string} endpoint - The server endpoint to be called.
 * @param {Function|null} callback - A function to be called on the response data if it exists.
 * @param {Object} optional - An object containing the HTTP request options.
 * @param {Object|null} optional.data - The data to be sent with the request.
 * @param {string} optional.method - The HTTP method to be used (default is 'get').
 * @param {string|null} optional.errorMessage - The error message to be displayed in case of a failed request.
 * @returns {Object|void} - If a callback function is passed, it returns the result of the callback function, otherwise it returns an object containing the status and data of the response.
 */
export default async function fetchHandler(
    endpoint: string,
    callback: Function | null = null,
    optinal: any = { data: null, method: "get", errorMessage: null }
) {
    try {
        const url = `${process.env.NEXT_PUBLIC_ENDPOINT}${endpoint}`;
        const token = localStorage.getItem("token");

        const option: any = {
            url,
            method: optinal.method,
            data: optinal.data,
        };
        if (token) option.headers = { Authorization: "Bearer " + token };
        const response = await axios(option);

        if (response.data) {
            //console.log(response.data)
            return callback ? callback(response.data) : { status: true, data: response.data };
        }
    } catch (err: any) {
        if (optinal.errorMessage) {
            notificationRef.current.showNotification("error", optinal.errorMessage);
        } else if (err.response?.data?.message) {
            notificationRef.current.showNotification("error", err.response.data.message);
        }
        console.log(err);
        //console.log(err.response)
    }
}
