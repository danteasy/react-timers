import { IconButton, Tooltip } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlaybackButton from "./playback-button";

interface Props {
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    handleReset: () => void;
    isClickSound: boolean;
    setIsClickSound: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaybackControlPanel: React.FC<Props> = ({
    isPlaying,
    setIsPlaying,
    handleReset,
    isClickSound,
    setIsClickSound,
}) => {
    return (
        <div className="inline-flex items-center gap-1 justify-center bg-gray-100 rounded-md px-2 mt-2">
            <PlaybackButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <Tooltip title="Restart">
                <IconButton onClick={handleReset}>
                    <RestartAltIcon color="primary" fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip title={isClickSound ? "Mute" : "Unmute"}>
                <IconButton onClick={() => setIsClickSound(!isClickSound)}>
                    {isClickSound ? (
                        <VolumeUpIcon color="primary" fontSize="large" />
                    ) : (
                        <VolumeOffIcon color="primary" fontSize="large" />
                    )}
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default PlaybackControlPanel;
