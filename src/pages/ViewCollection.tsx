import { Chip, Divider } from "@mui/material";
import SocialMediaShare from "../components/SocialMediaShare";
import CoverImages from "../components/CoverImages";
import CollectionHeader from "../components/CollectionHeader";
import { useParams } from "react-router-dom";
import { PublishedCollection } from "../helpers/baseTypes";
import StartQuizButton from "../components/StartQuizButton";
import CollectionSummary from "../components/CollectionSummary";
import { useFetch } from "../helpers/apiHelpers";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading";
import { useEffect } from "react";
import { clearError, setError } from "../redux/error";
import "./styles/view-collection.scss";
import { usePageTitle } from "../helpers/helpers";

const ViewCollection = () => {
    const commonSharedConfig = {
        url: window.location.href,
    };
    const params = useParams();
    const dispatch = useDispatch();

    const { data, loading, error } = useFetch(`/collections/${params.id}`);
    usePageTitle(data?.collectionMetaData?.title || "");

    useEffect(() => {
        dispatch(setIsLoading(loading));
    }, [loading, dispatch]);

    useEffect(() => {
        dispatch(error ? setError({ name: "Collection Not Found", message: "Please Refresh" }) : clearError());
    }, [error, dispatch]);

    const collection = data as PublishedCollection;
    return (
        <div className="view-collection display-padding">
            {collection ? (
                <>
                    <div className="collection-metadata d-flex">
                        <CollectionHeader
                            collectionId={collection.collectionId}
                            collectionMetaData={collection.collectionMetaData}
                        />

                        <Divider>
                            <SocialMediaShare {...commonSharedConfig} />
                        </Divider>
                        <CollectionSummary cards={collection.cards} />
                        <StartQuizButton titleText="Start" collection={collection} />
                        <Divider />
                        <CoverImages images={collection.cards.slice(0, 3).map((card) => card.photoURL)} />
                        <p className="collection-description">{collection.collectionMetaData.description}</p>

                        <span className="collection-tags">
                            {collection.collectionMetaData.tags.map((tag) => {
                                return <Chip key={tag} label={tag} variant="outlined" />;
                            })}
                        </span>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ViewCollection;
