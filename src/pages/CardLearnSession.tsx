import _ from "lodash";
import React from "react";
import { useLocation } from "react-router-dom";
import CardViews from "../components/CardViews";
import { PublishedCollection } from "../helpers/baseTypes";
import { DUMMY_COLLECTION } from "../helpers/constants";

interface CardLearnState {
    collection: PublishedCollection;
}
const CardLearnSession = () => {
    const collection = (useLocation().state as CardLearnState)?.collection || DUMMY_COLLECTION;

    return <CardViews cards={_.shuffle(collection.cards)} collectionMetaData={collection.collectionMetaData} collectionId={2} />;
};

export default CardLearnSession;
