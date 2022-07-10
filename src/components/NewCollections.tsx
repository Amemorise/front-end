import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../helpers/apiHelpers";
import { PublishedCollection } from "../helpers/baseTypes";
import CollectionCard from "./CollectionCard";
import "./styles/card.scss";

const NewCollections = () => {
    const { data } = useFetch(`/home/latestCollections`);

    return (
        <div>
            <h4>New Collections</h4>
            <div className={"cards-list"}>
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
            </div>
        </div>
    );
};

export default NewCollections;
