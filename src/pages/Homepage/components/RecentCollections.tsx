import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../../../helpers/apiHelpers";
import CollectionGridList from "../../../components/CollectionGridList";

const RecentCollections = () => {
    const { data, loading } = useFetch(`/home/learnings`);
    return (
        <div>
            <Stack direction="row" justifyContent={"space-between"} alignItems="center">
                <Typography variant="h6">Jump back in!</Typography>
                <Link to={"/collections"} style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography variant={"body2"}>SEE ALL</Typography>
                </Link>
            </Stack>
            <CollectionGridList collections={data && data.length ? data : []} loading={loading} learningList={true} />
        </div>
    );
};

export default RecentCollections;
