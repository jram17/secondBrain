import axios from "axios";
import { useEffect, useState } from "react";

export function useCheckAuth(){
    const [auth,setAuth]=useState(false);
    axios.defaults.withCredentials=true;

    async function refreshAuth(){
        try{
            const response = await  axios.post("http://localhost:3000/api/v1/verifyJWT");
            if(response.data.valid){
                setAuth(true);
    
            }else{
                console.log("user is not authorized");
            }

        }catch(error){
            console.log("this was the err while checking auth",error);
            if(axios.isAxiosError(error) && error.response?.status === 401){
                try {
                    const retryResponse = await axios.post("http://localhost:3000/api/v1/verifyJWT");
                    setAuth(retryResponse.data.valid);
 
                } catch (retryError) {
                    console.error("Failed to fetch content even after token renewal", retryError);
                }
            }else{
                console.error("Failed to fetch content", error);
            }
        }
    }

    useEffect(()=>{
        refreshAuth();
    },[])

    return {auth,refreshAuth}
}

