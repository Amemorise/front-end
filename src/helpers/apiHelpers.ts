import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../redux/loading";
import { setToast } from "../redux/toast";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
    withCredentials: true,
});

export const useFetch = (url: string, loadingOverlay?: boolean) => {
    const [data, setData] = useState<any>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

                if (err.status === 401) {
                    navigate("/login");
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [url, dispatch]);

    useEffect(() => {
        if (loadingOverlay) {
            dispatch(setIsLoading(loading));
        }
    }, [loading, dispatch, loadingOverlay]);
    return { data, loading, error };
};
