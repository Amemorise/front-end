import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../../../helpers/apiHelpers";
import CollectionGridList from "../../../components/CollectionGridList";

const NewCollections = () => {
    const { data, loading } = useFetch(`/home/latestCollections`);

    return (
        <div>
            <Stack direction="row" justifyContent={"space-between"}>
                <h4>New Collections</h4>
                <Link to={"/search?sortBy=date&desc=true"} style={{ color: "inherit", textDecoration: "none" }}>
                    <h5>SEE ALL</h5>
                </Link>
            </Stack>
            <CollectionGridList collections={data && data.length ? data : []} loading={loading} />
        </div>
    );
};

export default NewCollections;
