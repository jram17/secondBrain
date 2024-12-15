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
    // async function refresh() {
    //     const response = await axios.get("http://localhost:3000/api/v1/content");
    //     setContents(response.data.content)
    // }


    // from gpt
    async function refresh() {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/content");
            setContents(response.data.content);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                // If the access token has expired, try again
                try {
                    // Make another request (renewed token should be issued automatically by the middleware)
                    const retryResponse = await axios.get("http://localhost:3000/api/v1/content");
                    setContents(retryResponse.data.content);
                } catch (retryError) {
                    console.error("Failed to fetch content even after token renewal", retryError);
                }
            } else {
                console.error("Failed to fetch content", error);
            }
        }
    }

    useEffect(() => {
        refresh();
    }, [])

    return { contents, refresh }

}