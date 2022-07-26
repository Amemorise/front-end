import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { useFetch } from "../../../helpers/apiHelpers";
import { PublishedCollection } from "../../../helpers/baseTypes";
import CollectionGridList from "../../../components/CollectionGridList";

interface LoadingListProps {
    url: string;
    learningList?: boolean;
}
const LoadingList = ({ url, learningList }: LoadingListProps) => {
    const [page, setPage] = useState(1);

    const { data, loading } = useFetch(`${url}?page=${page}`);
    const [collections, setCollections] = useState<PublishedCollection[]>([]);

    useEffect(() => {
        if (data?.collections?.length) {
            setCollections((prevCol) => [...prevCol, ...data.collections]);
        }
    }, [data]);
    const handleClick = () => {
        setPage(page + 1);
    };
    return (
        <Stack spacing={3}>
            <CollectionGridList loading={loading} collections={collections} learningList={learningList} />
            {data && data.moreToLoad ? (
                <LoadingButton
                    sx={{ alignSelf: "center" }}
                    size="small"
                    onClick={handleClick}
                    loading={loading}
                    variant="outlined"
                >
                    Load More
                </LoadingButton>
            ) : null}
        </Stack>
    );
};

export default LoadingList;
