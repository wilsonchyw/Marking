import { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";

const useLogin = () => {
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const token = typeof window !== "undefined"?localStorage.getItem("token"):null;
    useEffect(() => {        
        if (token) {
            const decodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            //const decoded = decodeToken(token);

            if (!isMyTokenExpired) {
                console.log({ isMyTokenExpired });
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
