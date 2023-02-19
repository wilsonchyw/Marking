import _axios from "@/lib/axios";
import { notificationRef } from "@/pages/_app";

export interface IfetchHandlerProps {
    endpoint: string;
    method?: string;
    data?: any;
    callback: Function | null;
}

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
        const response = await _axios(option);

        if (response.data) {
            return callback ? callback(response.data) : { status: true, data: response.data };
        }
    } catch (err: any) {
        if (optinal.errorMessage) {
            notificationRef.current.showNotification("error", optinal.errorMessage)
        }else if(err.data?.message){
            notificationRef.current.showNotification("error", err.data.message)
        }
        console.log(err);
    }
}
