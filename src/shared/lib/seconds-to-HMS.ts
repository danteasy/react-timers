const secondsToHMS = (d: number): string | boolean => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const returnHours = h > 0 ? `${h} ${h === 1 ? "hr." : "hrs."}` : "";
    const returnMinutes = m > 0 ? `${m} ${m === 1 ? "min." : "mins."}` : "";
    const returnSeconds = s > 0 ? `${s} ${s === 1 ? "sec." : "secs."}` : "";

    const parts = [returnHours, returnMinutes, returnSeconds].filter(Boolean);

    if (parts.length === 0) {
        return false;
    }

    return parts.join(" ").trim();
};

export default secondsToHMS;
