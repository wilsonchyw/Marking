import { IUser } from "@/Components/interface";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuth = (user: IUser|null) => {
    const route = useRouter();
    useEffect(() => {
        if (user && user.role<1 && /^\/instructor/.test(route.pathname)) route.push("/");
    }, [user]);
};

export default useAuth;
