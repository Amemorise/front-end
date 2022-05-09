import { PublishedCollection, User } from "./baseTypes";

export const MOBILE_BREAKPOINT = 720;
export const DEFAULT_NEW_CARDS = 3;
export const DUMMY_USER: User = { displayName: "Kofi Twum-Ampofo", email: "peterperfect96@gmail.com", emailVerified: true, photoURL: "https://lh3.googleusercontent.com/a-/AOh14GhVrrHKLdSo9ieDv4xhjPyvoKXYnTMguODKYuE0og=s96-c" };
export const DUMMY_COLLECTION: PublishedCollection = {
    collectionMetaData: {
        title: "Very Cool Collection",
        description: "I couldn't think of a cool description",
        tags: ["Geography", "Culture"],
        private: false,
        verified: true,
        createdBy: DUMMY_USER,
        creationDate: 1394104654,
        rating: {
            value: 3,
            raterCount: 8,
        },
    },
    cards: [
        {
            photoURL: "https://countryflagsapi.com/png/ghana",
            hint: "A hint",
            label: "Ghana",
        },

        {
            photoURL: "https://countryflagsapi.com/png/nigeria",
            hint: "A hint",
            label: "Nigeria",
        },
    ],
};
