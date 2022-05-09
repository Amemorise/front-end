export const setPageTitle = (title: string) => {
    document.title = `${title} || Amemorise`;
};

export const convertToDateString = (epochNumber: number) => {
    const secondsToMilliSeconds = 1000;
    return new Date(epochNumber * secondsToMilliSeconds).toDateString();
};
