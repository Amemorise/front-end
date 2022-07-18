import { Chip, Divider } from "@mui/material";
import SocialMediaShare from "../components/SocialMediaShare";
import CoverImages from "../components/CoverImages";
import CollectionHeader from "../components/CollectionHeader";
import { useParams } from "react-router-dom";
import { Lesson, PublishedCollection } from "../helpers/baseTypes";
import StartQuizButton from "../components/StartQuizButton";
import CollectionSummary from "../components/CollectionSummary";
import { useCallLoadingOverlay, useFetch } from "../helpers/apiHelpers";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearError, setError } from "../redux/error";
import "./styles/view-collection.scss";
import { getLessonRowData, usePageTitle } from "../helpers/helpers";

const ViewCollection = () => {
    const commonSharedConfig = {
        url: window.location.href,
    };
    const params = useParams();
    const dispatch = useDispatch();

    const { data, loading, error } = useFetch(`/collections/${params.id}`);
    const lessonFetch = useFetch(`/learning/${params.id}`);
    usePageTitle(data?.collectionMetaData?.title || "");

    useCallLoadingOverlay(loading);

    useEffect(() => {
        dispatch(error ? setError({ name: "Collection Not Found", message: "Please Refresh" }) : clearError());
    }, [error, dispatch]);

    const collection = data as PublishedCollection;
    if (loading) {
        return <></>;
    } else if (collection) {
        const { cards, collectionMetaData, collectionId } = collection;
        const lesson: Lesson = lessonFetch.data && lessonFetch.data.lesson;

        const rowData = getLessonRowData(cards, lesson);
        return (
            <div className="view-collection display-padding">
                <div className="collection-metadata d-flex">
                    <CollectionHeader collectionId={collectionId} collectionMetaData={collectionMetaData} />

                    <Divider>
                        <SocialMediaShare {...commonSharedConfig} />
                    </Divider>
                    <CollectionSummary cards={rowData || []} />
                    <StartQuizButton titleText="Start" collection={collection} />
                    <Divider />
                    <CoverImages images={cards.slice(0, 3).map((card) => card.photoURL)} />
                    <p className="collection-description">{collectionMetaData.description}</p>

                    <span className="collection-tags">
                        {collectionMetaData.tags.map((tag) => {
                            return <Chip key={tag} label={tag} variant="outlined" />;
                        })}
                    </span>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default ViewCollection;
