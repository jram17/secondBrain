import {  useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Content {
    _id: string;
    type: string;
    link: string;
    title: string;
    tags?: string[];
    userId: string;
    timestamp: Date;

}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);
    axios.defaults.withCredentials = true;
    const navigate=useNavigate();
    async function refresh() {
        if(document.cookie){
            try {
                const response = await axios.get("http://localhost:3000/api/v1/content");
                setContents(response.data.content);
                console.log("101")
            } catch (error) {
                console.log("this is the error:",error);
                navigate("/sign-in");
            }
        }
        else{
            console.log("cookie not found");
            navigate("/sign-in");
        }
    }

    useEffect(()=>{
        refresh();
        const interval = setInterval(() => {
            refresh();
        }, 1000 * 1);
        return () => clearInterval(interval); 
    },[])

    return { contents, refresh }

}