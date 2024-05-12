import React from "react";
import { secondsToHMSWithDots } from "../lib/seconds-to-HMS";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { subTimer } from "@/enitites/timer";

type Props = {
    subtimer: subTimer;
} & React.HtmlHTMLAttributes<HTMLLIElement>;

const PlaybackSubtimersItem: React.FC<Props> = ({
    subtimer,
    children,
    className = "",
    ...props
}) => {
    return (
        <li
            className={`flex justify-between gap-4 items-center bg-gray-100 p-2 relative ${className}`}
            {...props}
        >
            <span className="font-normal">{subtimer?.name}</span>
            <div className="text-sm flex gap-1 items-center">
                <span className="">
                    {secondsToHMSWithDots(subtimer?.duration)}
                </span>
                <AccessTimeIcon
                    fontSize="small"
                    className="text-gray-600  align-center"
                />
            </div>
            {children}
        </li>
    );
};

export default PlaybackSubtimersItem;
