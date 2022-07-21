import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../../../helpers/apiHelpers";
import CollectionGridList from "../../../components/CollectionGridList";

const RecentCollections = () => {
    const { data, loading } = useFetch(`/home/learnings`);
    return (
        <div>
            <Stack direction="row" justifyContent={"space-between"}>
                <h4>Jump back in!</h4>
                <Link to={"/collections"} style={{ color: "inherit", textDecoration: "none" }}>
                    <h5>SEE ALL</h5>
                </Link>
            </Stack>
            <CollectionGridList collections={data && data.length ? data : []} loading={loading} />
        </div>
    );
};

export default RecentCollections;
