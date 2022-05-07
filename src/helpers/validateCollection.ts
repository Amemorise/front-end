import { Collection } from "./baseTypes";

export const validateCollection = (collection: Collection) => {
    const errors = { collectionMetaData: {}, cards: [""] };
    collection.cards.forEach((card, index) => {
        let errorMessages = "";
        if (!card.photoURL) {
            errorMessages = "Image is required";
        }
        if (!card.label) {
            errorMessages = "Label is required";
        }
        errors.cards[index] = errorMessages;
    });

    return errors;
};
