import { Dispatch } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface PaginationProps {
    page: number;
    count: number;
    setPage: Dispatch<any>;
}
const Paginate = ({ page, count, setPage }: PaginationProps) => {
    let [searchParams, setSearchParams] = useSearchParams();
    console.log(count);
    return (
        <Pagination
            count={count}
            page={page || 1}
            variant={"outlined"}
            sx={{ ul: { justifyContent: "center" } }}
            onChange={(e, page) => {
                const queries = Object.fromEntries([...searchParams]);
                setSearchParams({ ...queries, page: String(page) });
                setPage(page);
            }}
            color="primary"
            renderItem={(item) => <PaginationItem components={{ previous: ArrowBack, next: ArrowForward }} {...item} />}
        />
    );
};

export default Paginate;
