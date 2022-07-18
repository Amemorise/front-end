import { ImageType } from "react-images-uploading";

export interface User {
    displayName: string;
    photoURL: string;
    email: string;
    emailVerified: boolean;
    userId: number;
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
export interface EditingCard extends Omit<Card, "photoURL"> {
    photoURL: string | ImageType;
}

export interface CollectionMetaData {
    title: string;
    description: string;
    tags: string[];
    private: boolean;
    prompt: string;
    category: string;
    createdBy: User;
}

export interface PublishedCollectionMetaData extends CollectionMetaData {
    verified: boolean;
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

export interface EditingCollection {
    collectionMetaData: CollectionMetaData;
    cards: EditingCard[];
}

export interface PublishedCollection {
    collectionMetaData: PublishedCollectionMetaData;
    cards: Card[];

    collectionId: number;
}
export interface LocationState {
    collection: PublishedCollection;
}

export interface Lesson {
    cards: ICardLesson[];
    collectionId: number;
    userId: number;
}
export interface ICardLesson {
    cardId: number;
    attempts: number[];
}

export interface CardLessonRowData extends Card, Partial<ICardLesson> {
    average: number;
}
