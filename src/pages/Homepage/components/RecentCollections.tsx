import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../../../helpers/apiHelpers";
import { PublishedCollection } from "../../../helpers/baseTypes";
import CollectionCard from "../../../components/CollectionCard";

const RecentCollections = () => {
    const { data, loading } = useFetch(`/home/learnings`);
    console.log(data);
    return (
        <div>
            <h4>Jump back in!</h4>
            <div className={"cards-list"}>
                {loading ? (
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
                ) : data && data.length ? (
                    (data as PublishedCollection[]).map((collection, index) => {
                        console.log(collection);
                        return (
                            <Link key={index} to={`/collections/${collection.collectionId}`} className="card-link">
                                <CollectionCard {...collection} />
                            </Link>
                        );
                    })
                ) : null}
            </div>
        </div>
    );
};

export default RecentCollections;
