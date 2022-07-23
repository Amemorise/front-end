import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../../../helpers/apiHelpers";
import CollectionGridList from "../../../components/CollectionGridList";

const NewCollections = () => {
    const { data, loading } = useFetch(`/home/latestCollections`);

    return (
        <div>
            <Stack direction="row" justifyContent={"space-between"} alignItems="center">
                <Typography variant={"h6"}>New Collections</Typography>
                <Link to={"/search?sortBy=date&desc=true"} style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography variant={"body2"}>SEE ALL</Typography>
                </Link>
            </Stack>
            <CollectionGridList collections={data && data.length ? data : []} loading={loading} />
        </div>
    );
};

export default NewCollections;
