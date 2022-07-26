import { Grid, Card, CardContent, Typography } from "@mui/material";
import { PublishedCollection } from "../helpers/baseTypes";
import { Create, Add } from "@mui/icons-material";
import CollectionCard from "./CollectionCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { Link } from "react-router-dom";

interface CollectionGridListProps {
    collections: PublishedCollection[];
    loading: boolean;
    learningList?: boolean;
}

const CollectionGridList = (props: CollectionGridListProps) => {
    const { loading, collections, learningList } = props;
    return (
        <Grid container spacing={3} sx={{ marginTop: 0 }}>
            {collections.map((collection, index) => {
                return (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Link to={`/collections/${collection.collectionId}`} className="card-link">
                            <CollectionCard {...collection} />
                        </Link>
                    </Grid>
                );
            })}
            {loading ? (
                <LoadingSkeleton count={4} />
            ) : collections.length < 4 ? (
                <Grid item xs={12} sm={6} md={3} display="flex">
                    <Link to={learningList ? "/search" : "/collections/create"} className="card-link">
                        <Card sx={{ height: "100%", minHeight: "15rem", display: "flex" }}>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                {learningList ? <Add /> : <Create />}
                                <Typography variant="body2" margin={2}>
                                    {learningList ? "Learn a collection" : "Create A Collection"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ) : null}
        </Grid>
    );
};

export default CollectionGridList;
