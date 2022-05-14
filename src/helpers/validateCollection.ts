import { cloneDeep } from "lodash";
import { Collection } from "./baseTypes";

export const errorSchema = { collectionMetaData: { title: false, description: false, prompt: false }, cards: [{ photoURL: false, label: false }] };

export const validateCollection = (collection: Collection) => {
    const errors = cloneDeep(errorSchema);
    errors.collectionMetaData.title = !collection.collectionMetaData.title;

    errors.collectionMetaData.description = !collection.collectionMetaData.description;
    collection.cards.forEach((card, index) => {
        errors.cards[index] = { photoURL: !card.photoURL, label: !card.label };
    });

    errors.collectionMetaData.description = !collection.collectionMetaData.description;
    const errorFound = JSON.stringify(errors).includes("true");
    return { errors, errorFound };
};
