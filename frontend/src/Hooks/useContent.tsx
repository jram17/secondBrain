import { useEffect, useState } from "react";
import axios from "axios";

interface Content{
    _id: string;
    type: string;
    link: string;
    title: string;
    tags?:string[];
    userId: string;
    timestamp:Date;

}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    function refresh() {
        axios.get("http://localhost:3000/api/v1/content", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            setContents(response.data.content)
        }).catch(err => { console.log("this is the error :", err) })
    }

    useEffect(() => {
        refresh();
        const interval=setInterval(() => {
            refresh();
        }, 10*1000);

        return ()=>{
            clearInterval(interval);
        }
    }, [])

    return {contents,refresh}

}