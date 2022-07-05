import axios from "axios";
import { useState, useEffect } from "react";

const useFetchCallBack = () => {
    const useFetch = (url: string) => {
        const [data, setData] = useState<any>(undefined);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(false);

        useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios.get(url);
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
    return useFetch;
};

export default useFetchCallBack;
