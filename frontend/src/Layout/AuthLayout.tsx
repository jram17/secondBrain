import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../icons/LoadingIcon";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const AuthLayout: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [valid, setValid] = useState<boolean | null>(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    async function verify() {
        if (document.cookie) {
            try {
                const response = await axios.post("http://localhost:3000/api/v1/verifyJWT");
                if (response.data.valid) {
                    setValid(true);
                    console.log("303");
                } else {
                    setValid(false);
                    navigate("/sign-in", { replace: true });
                }
            } catch (error) {
                console.error("Error during verification:", error);
                setValid(false);
                navigate("/sign-in", { replace: true });
            }
        } else {
            console.log("refresh cookie expired !!");
            setValid(false);
            navigate("/sign-in", { replace: true });
        }
    }

    useEffect(() => {
        verify()
        const interval = setInterval(() => {
            verify()
        }, 500 * 1);
        return () => clearInterval(interval);
    }, [])


    if (valid === null) {
        return <div className="flex justify-center items-center"><LoadingIcon /></div>
    }
    if (valid === false) {
        navigate("/sign-in");
    }
    return <>{children}</>

};