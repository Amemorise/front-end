import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CollectionMetaData, User } from "../helpers/baseTypes";
import { DEFAULT_NEW_CARDS, newCard } from "../helpers/constants";
import { setPageTitle } from "../helpers/helpers";
import { RootState } from "../redux/store";
import CollectionManagement from "../components/CollectionManagement";

const CreateCollection = () => {
    useEffect(() => setPageTitle("Create Collection"), []);
    const user = useSelector((state: RootState) => state.user.value) as User;

    const defaultCards = [];

    for (let i = 0; i < DEFAULT_NEW_CARDS; i++) {
        defaultCards.push({
            ...newCard,
            id: i,
        });
    }

    const collectionMetaData: CollectionMetaData = { title: "", description: "", tags: [], private: false, prompt: "What is this card?", category: "", createdBy: user };

    return <CollectionManagement collectionMetaData={collectionMetaData} cards={defaultCards} existingCollection={false} />;
};

export default CreateCollection;
