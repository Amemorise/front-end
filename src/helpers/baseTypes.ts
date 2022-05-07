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
    index?: number;
    label: string;
    subCategory?: {
        [key: string]: string;
    };
}

export interface CollectionMetaData {
    title: string;
    description: string;
    tags: string[];
    private: boolean;
}
export interface Collection {
    collectionMetaData: CollectionMetaData;
    cards: Card[];
}
