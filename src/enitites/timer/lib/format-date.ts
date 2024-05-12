import moment from "moment";

function formatDate(isoString: string): string {
    const now = moment();
    const inputDate = moment(isoString);

    const diffInSeconds = now.diff(inputDate, "seconds");
    const diffInMinutes = now.diff(inputDate, "minutes");
    const diffInHours = now.diff(inputDate, "hours");
    const diffInDays = now.diff(inputDate, "days");

    if (diffInSeconds < 60) {
        return "just now";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} ${pluralize("minute", diffInMinutes)} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} ${pluralize("hour", diffInHours)} ago`;
    } else if (diffInDays < 5) {
        return `${diffInDays} ${pluralize(
            "day",
            diffInDays
        )} ${getTimeComponent(diffInDays, inputDate)}`;
    } else {
        return inputDate.format("MMMM Do, YYYY [at] h:mm A");
    }
}

function pluralize(word: string, count: number): string {
    return count === 1 ? word : word + "s";
}

function getTimeComponent(diffInDays: number, date: moment.Moment): string {
    const hours = date.format("HH");
    const minutes = date.format("mm");
    return `at ${hours}:${minutes}`;
}

export default formatDate;
