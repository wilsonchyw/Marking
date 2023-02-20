import { IUser } from "@/Components/interface";
import { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";

const useLogin = () => {
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<IUser|null>(null);
    const token = typeof window !== "undefined"?localStorage.getItem("token"):null;
    useEffect(() => {        
        if (token) {
            const decodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);    
            if (!isMyTokenExpired) {
                setIsLoggedIn(true);
                setUser(decodedToken.data);
            } else {
                localStorage.removeItem("token");
            }
        }else{
            setIsLoggedIn(false);
        }
        setChecking(false);
    }, [token]);

    return { isLoggedIn, user, checking };
};

export default useLogin;
