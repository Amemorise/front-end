import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useEffect } from "react";

TimeAgo.addDefaultLocale(en);

export const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} || Amemorise`;
    }, [title]);
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
