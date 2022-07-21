import { Dispatch } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface PaginationProps {
    searchParams: URLSearchParams;
    setSearchParams: Dispatch<any>;
    totalCollections: number;
}
const Paginate = ({ searchParams, setSearchParams, totalCollections }: PaginationProps) => {
    return (
        <Pagination
            count={Math.ceil(totalCollections / Number(searchParams.get("limit") || 15))}
            page={Number(searchParams.get("page") || 1)}
            variant={"outlined"}
            sx={{ ul: { justifyContent: "center" } }}
            onChange={(e, page) => {
                const queries = Object.fromEntries([...searchParams]);
                setSearchParams({ ...queries, page: String(page) });
            }}
            color="primary"
            renderItem={(item) => <PaginationItem components={{ previous: ArrowBack, next: ArrowForward }} {...item} />}
        />
    );
};

export default Paginate;
