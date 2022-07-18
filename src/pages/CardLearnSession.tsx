import _ from "lodash";
import { useLocation } from "react-router-dom";
import CardViews from "../components/CardViews";
import { PublishedCollection } from "../helpers/baseTypes";

interface CardLearnState {
    collection: PublishedCollection;
}
const CardLearnSession = () => {
    const collection = (useLocation().state as CardLearnState)?.collection;

    return (
        <CardViews
            cards={_.shuffle(collection.cards)}
            collectionMetaData={collection.collectionMetaData}
            collectionId={2}
        />
    );
};

export default CardLearnSession;
