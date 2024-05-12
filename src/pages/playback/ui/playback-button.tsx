import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { IconButton, Tooltip } from "@mui/material";

interface Props {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

const PlaybackButton: React.FC<Props> = ({ isPlaying, setIsPlaying }) => {
    const fontSize = "large";

    return (
        <Tooltip title={isPlaying ? "Pause" : "Resume"}>
            <IconButton
                onClick={() => setIsPlaying(!isPlaying)}
                color="primary"
            >
                {isPlaying ? (
                    <PauseIcon fontSize={fontSize} />
                ) : (
                    <PlayArrowIcon fontSize={fontSize} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default PlaybackButton;
