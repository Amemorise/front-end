import { Grid, Skeleton } from "@mui/material";
import React from "react";

interface LoadingSkeletonProps {
    count: number;
}
const LoadingSkeleton = (props: LoadingSkeletonProps) => {
    return (
        <>
            {Array.from(Array(props.count || 0)).map((_t, id) => (
                <Grid item key={id} xs={12} sm={4} md={3}>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={"100%"}
                        height={240}
                        sx={{ flex: 1, borderRadius: "1rem" }}
                    />
                </Grid>
            ))}
        </>
    );
};

export default LoadingSkeleton;
