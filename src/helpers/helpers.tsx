import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

export const setPageTitle = (title: string) => {
    document.title = `${title} || Amemorise`;
};

export const convertToDateString = (epochNumber: number) => {
    return <ReactTimeAgo date={new Date(epochNumber)} locale="en-US" />;
};
