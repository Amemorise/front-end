import { Card, PublishedCollection, User } from "./baseTypes";

export const MOBILE_BREAKPOINT = 600;
export const PREVIOUS_ATTEMPTS_CONSIDERED = 15;
export const DEFAULT_NEW_CARDS = 3;
export const newCard: Card = {
    label: "",
    hint: "",
    photoURL: "",
    id: 0,
};
export const DUMMY_USER: User = {
    userId: 3,
    displayName: "Kofi Twum-Ampofo",
    email: "peterperfect96@gmail.com",
    emailVerified: true,
    photoURL: "https://lh3.googleusercontent.com/a-/AOh14GhVrrHKLdSo9ieDv4xhjPyvoKXYnTMguODKYuE0og=s96-c",
};
export const DUMMY_COLLECTION: PublishedCollection = {
    collectionId: 4,
    collectionMetaData: {
        title: "Very Cool Collection",
        description: "I couldn't think of a cool description",
        tags: ["Geography", "Culture"],
        private: false,
        category: "test",
        prompt: "What country's flag is this",
        verified: true,
        createdBy: DUMMY_USER,
        creationDate: 1652509684000,
        rating: {
            value: 3,
            raterCount: 8,
        },
    },
    cards: [
        {
            photoURL:
                "https://w7.pngwing.com/pngs/566/173/png-transparent-national-flags-themed-planet-illustration-globe-flags-of-the-world-world-flag-flag-flag-countries-flags-spherical-miscellaneous-flag-symmetry-thumbnail.png",
            hint: "A hint",
            label: "World Flags",
            id: 3892,
        },
        {
            photoURL: "https://countryflagsapi.com/png/australia",
            hint: "A hint",
            label: "Australia",
            id: 5423,
        },
        {
            photoURL: "https://countryflagsapi.com/png/ghana",
            hint: "A hint",
            label: "Ghana",
            id: 2993,
        },
    ],
};
