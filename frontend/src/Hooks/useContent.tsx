import { useEffect, useState } from "react";
import axios from "axios";

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
    async function refresh() {
        const response = await axios.get("http://localhost:3000/api/v1/content");
        setContents(response.data.content)
    }

    useEffect(() => {
        refresh();
    }, [])

    return { contents, refresh }

}