import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading";
import { setToast } from "../redux/toast";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
    withCredentials: true,
});

export const useCallLoadingOverlay = (loading: boolean) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(loading));
    }, [loading, dispatch]);
};
export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(undefined);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(url);
                setData(res.data);
            } catch (err: any) {
                setError(err);

                dispatch(
                    setToast({
                        type: "error",
                        message: err.message,
                    })
                );
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};
