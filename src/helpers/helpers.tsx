import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useEffect } from "react";
import { Lesson, CardLessonRowData, Card } from "./baseTypes";
import { PREVIOUS_ATTEMPTS_CONSIDERED } from "./constants";

TimeAgo.addDefaultLocale(en);

export const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} || Amemorise`;
    }, [title]);
};

export const getLessonRowData = (cards: Card[], lesson: Lesson | null): CardLessonRowData[] | undefined => {
    return cards.map((card) => {
        const matchCard = lesson?.cards.find((match) => match.cardId === card.id);

        const average = (matchCard?.attempts.slice(-10).reduce((a, b) => a + b, 0) || 0) / PREVIOUS_ATTEMPTS_CONSIDERED;

        return {
            ...matchCard,
            ...card,
            average,
        };
    });
};
export const convertToDateString = (epochNumber: number) => {
    return <ReactTimeAgo date={new Date(epochNumber)} locale="en-US" />;
};

export const isNewCollection = (creationDate: number) => {
    const created = new Date(creationDate),
        now = new Date();
    const msBetweenDates = Math.abs(created.getTime() - now.getTime());

    // 👇️ convert ms to days                 hour   min  sec   ms
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);
    return daysBetweenDates < 7;
};

export const isFirstTimeGuest = () => {
    return !localStorage.getItem("amemorise-user");
};

export const setReturningUser = () => {
    localStorage.setItem("amemorise-user", "true");
};
