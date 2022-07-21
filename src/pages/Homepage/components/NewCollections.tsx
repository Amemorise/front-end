import { Grid, Skeleton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../../../helpers/apiHelpers";
import { PublishedCollection } from "../../../helpers/baseTypes";
import CollectionCard from "../../../components/CollectionCard";

const NewCollections = () => {
    const { data } = useFetch(`/home/latestCollections`);

    return (
        <div>
            <Stack direction="row" justifyContent={"space-between"}>
                <h4>New Collections</h4>
                <Link to={"/search?sortBy=date&desc=true"} style={{ color: "inherit", textDecoration: "none" }}>
                    <h5>SEE ALL</h5>
                </Link>
            </Stack>
            <Grid container>
                {data && data.length ? (
                    (data as PublishedCollection[]).map((collection, index) => {
                        return (
                            <Link key={index} to={`/collections/${collection.collectionId}`} className="card-link">
                                <CollectionCard {...collection} />
                            </Link>
                        );
                    })
                ) : (
                    <>
                        {Array.from(Array(4)).map((_t, id) => (
                            <Skeleton
                                animation="wave"
                                key={id}
                                variant="rectangular"
                                width={40}
                                height={240}
                                sx={{ flex: 1, borderRadius: "1rem" }}
                            />
                        ))}
                    </>
                )}
            </Grid>
        </div>
    );
};

export default NewCollections;
