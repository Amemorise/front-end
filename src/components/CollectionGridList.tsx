import { Grid } from "@mui/material";
import React from "react";
import { PublishedCollection } from "../helpers/baseTypes";
import CollectionCard from "./CollectionCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { Link } from "react-router-dom";

interface CollectionGridListProps {
    collections: PublishedCollection[];
    loading: boolean;
}

const CollectionGridList = (props: CollectionGridListProps) => {
    const { loading, collections } = props;
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
            {loading ? <LoadingSkeleton count={4} /> : null}
        </Grid>
    );
};

export default CollectionGridList;
