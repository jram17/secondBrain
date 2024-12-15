import Button from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordref = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    const signin = async () => {
        const username = usernameRef.current?.value;
        const password = passwordref.current?.value;
        console.log(username, password);
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }
        axios.defaults.withCredentials = true;
        const response = await axios.post("http://localhost:3000/api/v1/signin", {
            username, password
        });
        // const jwt = response.data.token;
        console.log("refresh token",response.data.refresh)
        // localStorage.setItem("token", jwt);
        navigate('/dashboard',{replace:true});



    }
    return <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-lg border  min-w-48 p-8 ">
            {/* <div className="pb-2 font-semibold text-2xl ">Sign In</div> */}
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordref} placeholder="Password" />
            <div className="flex justify-center pt-2">
                <Button onClick={signin} variant="primary" text='Sign In' fullwidth={true} loading={false} />
            </div>

        </div>
    </div>
}