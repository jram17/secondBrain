import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    async function refresh() {
        if (document.cookie) {
            try {
                const response = await axios.post("http://localhost:3000/api/v1/verifyJWT");
                if (response.data.valid) {
                    setAuth(true);
                    console.log("202");
                    return;
                } else {
                    console.log("user is not authorized");
                    setAuth(false);
                    navigate("/sign-in");
                    return;
                }
            } catch (error) {
                console.log("this is the error:", error);
                navigate("/sign-in");
            }

        } else {
            console.log("no cookie");
            setAuth(false);
            
        }
    }

    useEffect(() => {
        refresh();
        const interval = setInterval(() => {
            refresh();
        }, 1000 * 1);
        return () => clearInterval(interval);
    }, [])

    return { auth, refresh }
}