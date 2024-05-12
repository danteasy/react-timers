import React from "react";
import { Timer } from "../model/timer";
import { Card } from "@mui/material";
import formatDate from "../lib/format-date";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import secondsToHMS from "@/shared/lib/seconds-to-HMS";

type Props = {
    renderBottom?: () => React.ReactNode;
    renderTop?: () => React.ReactNode;
    timer: Timer;
} & React.ComponentProps<typeof Card>;

const TimerEntity: React.FC<Props> = ({
    timer,
    renderBottom,
    renderTop,
    className,
    ...props
}) => {
    return (
        <Card
            className={`p-4 ${className}`}
            sx={{
                boxShadow: "0px 0px 10px -7px rgba(0,0,0,0.75)",
                borderRadius: "20px",
                border: "1px solid #e8e4ec",
            }}
            {...props}
        >
            {renderTop && renderTop()}
            <div className="text-2xl" style={{ wordWrap: "break-word" }}>
                {timer.name}
            </div>
            <p className="mt-2" style={{ wordWrap: "break-word" }}>
                {timer.description}
            </p>
            <div className="mt-4 flex items-center gap-1">
                <AccessTimeIcon />
                {secondsToHMS(timer.duration) || "No duration"}
            </div>
            <p className="text-gray-400">
                Updated: {formatDate(timer.updatedAt)}
            </p>
            {renderBottom && renderBottom()}
        </Card>
    );
};

export default TimerEntity;
