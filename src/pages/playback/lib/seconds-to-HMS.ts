export function secondsToHMSWithDots(time: number) {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);

    let ret = "";
    if (hrs > 0) {
        ret += hrs + ":";
    }
    ret += String(mins).padStart(2, "0") + ":";
    ret += String(secs).padStart(2, "0");
    return ret;
}
