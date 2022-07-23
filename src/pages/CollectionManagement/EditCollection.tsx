import { PublishedCollection } from "../../helpers/baseTypes";
import { usePageTitle } from "../../helpers/helpers";
import CollectionManagement from "./components/CollectionManagement";
import { useParams } from "react-router-dom";
import { useFetch } from "../../helpers/apiHelpers";

const EditCollection = () => {
    usePageTitle("Edit Collection");

    const params = useParams();

    const { data } = useFetch(`/collections/${params.id}`, true);

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
