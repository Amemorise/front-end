import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PublishedCollection } from "../helpers/baseTypes";
import { usePageTitle } from "../helpers/helpers";
import CollectionManagement from "../components/CollectionManagement";
import { useParams } from "react-router-dom";
import { useFetch } from "../helpers/apiHelpers";
import { setError, clearError } from "../redux/error";
import { setIsLoading } from "../redux/loading";

const EditCollection = () => {
    usePageTitle("Edit Collection");

    const params = useParams();
    const dispatch = useDispatch();

    const { data, loading, error } = useFetch(`/collections/${params.id}`);

    useEffect(() => {
        dispatch(setIsLoading(loading));
    }, [loading, dispatch]);

    useEffect(() => {
        dispatch(error ? setError({ name: "Collection Not Found", message: "Please Refresh" }) : clearError());
    }, [error, dispatch]);
    const collection = data as PublishedCollection;

    return (
        <>
            {collection ? (
                <CollectionManagement
                    collectionMetaData={collection.collectionMetaData}
                    cards={collection.cards}
                    existingCollection={true}
                    collectionId={collection.collectionId}
                />
            ) : null}
        </>
    );
};

export default EditCollection;
