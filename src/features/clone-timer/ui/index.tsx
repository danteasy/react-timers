import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { cloneTimer, useAppDispatch } from "@/shared/store";

type Props = {
    timerId: string;
} & React.ComponentProps<typeof ContentCopyIcon>;

export const CloneTimer: React.FC<Props> = ({
    className = "",
    timerId,
    ...props
}) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(cloneTimer(timerId));
    };

    return (
        <Tooltip title="Clone timer
        
        ">
            <span onClick={handleClick}>
                <IconButton>
                    <ContentCopyIcon className={`${className}`} {...props} />
                </IconButton>
            </span>
        </Tooltip>
    );
};
