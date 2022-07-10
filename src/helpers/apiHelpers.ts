import axios from "axios";
import { useState, useEffect } from "react";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
    withCredentials: true,
});

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(url);
                setData(res.data);
            } catch (err: any) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};
