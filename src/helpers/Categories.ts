import Books from "../images/categories/books.jpg";
import Film from "../images/categories/film.jpg";

import Music from "../images/categories/music.jpg";
import Comics from "../images/categories/comics.jpg";
import Geography from "../images/categories/geography.jpg";
import Astronomy from "../images/categories/astronomy.jpg";

import Television from "../images/categories/television.jpg";

import Theatre from "../images/categories/theatre.jpg";

export interface CategoryType {
    name: string;
    image: string;
    attr: {
        userProfile: string;
        user: string;
        unsplashLink: string;
    };
}

export const Categories = [
    {
        name: "Entertainment: Books",
        image: Books,
        attr: {
            userProfile:
                "https://unsplash.com/@eddrobertson?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText",
            user: "Ed Robertson",
            unsplashLink:
                "https://unsplash.com/s/photos/books?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText",
        },
    },
    {
        name: "Entertainment: Film",
        image: Film,
        attr: {
            userProfile:
                "https://unsplash.com/@chuklanov?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText",
            user: "Avel Chuklanov",
            unsplashLink:
                "https://unsplash.com/s/photos/film?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText",
        },
    },
    {
        name: "Entertainment: Music",
        image: Music,
        attr: {
            userProfile:
                "https://unsplash.com/@marius?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
            user: "Marius Masalar",
            unsplashLink:
                "https://unsplash.com/s/photos/music?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        },
    },
    {
        name: "Science: Astronomy",
        image: Astronomy,
        attr: {
            userProfile: "https://unsplash.com/@aldebarans",
            user: "Aldebaran S",
            unsplashLink:
                "https://unsplash.com/s/photos/astronomy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        },
    },
    {
        name: "Astrology",
        image: "",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Entertainment: Musicals & Theatres",
        image: Theatre,
        attr: {
            userProfile:
                "https://unsplash.com/es/@libraryofcongress?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
            user: "Library of Congress",
            unsplashLink:
                "https://unsplash.com/s/photos/musicals-%26-theatres?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        },
    },
    {
        name: "Entertainment: Television",
        image: Television,
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "General Knowledge",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Entertainment: Video Games",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Entertainment: Board Games",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Geography",
        image: Geography,
        attr: {
            userProfile: "https://unsplash.com/@kylejglenn",
            user: "Kyle Glenn",
            unsplashLink:
                "https://unsplash.com/s/photos/geography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        },
    },

    {
        name: "Science: Biology",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Science: Computers",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Science: Mathematics",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Mythology",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Sports",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "History",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Politics",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Art",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Celebrities",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Animals",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Vehicles",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Entertainment: Comics",
        image: Comics,
        attr: {
            userProfile:
                "https://unsplash.com/s/photos/geography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
            user: "Erik Mclean",
            unsplashLink:
                "https://unsplash.com/@introspectivedsgn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        },
    },
    {
        name: "Science: Gadgets",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Entertainment: Japanese Anime & Manga",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
    {
        name: "Entertainment: Cartoon & Animations",
        attr: {
            userProfile: "",
            user: "",
            unsplashLink: "",
        },
    },
];
