export interface User {
    displayName: string;
    photoURL: string;
    email: string;
    emailVerified: boolean;
}

export interface ProfileInterface {
    displayName: string;
    photoURL: string;
    profileURL: string;
}
export interface Card {
    photoURL: string;
    hint: string;
    label: string;
    subCategory?: {
        [key: string]: string;
    };
    id: number;
}

export interface CollectionMetaData {
    title: string;
    description: string;
    tags: string[];
    private: boolean;
    prompt: string;
}

export interface PublishedCollectionMetaData extends CollectionMetaData {
    verified: boolean;
    createdBy: User;
    id: number;
    creationDate: number;
    rating: {
        value: number;
        raterCount: number;
    };
}
export interface Collection {
    collectionMetaData: CollectionMetaData;
    cards: Card[];
}

export interface PublishedCollection {
    collectionMetaData: PublishedCollectionMetaData;
    cards: Card[];
}
export interface LocationState {
    collection: PublishedCollection;
}
