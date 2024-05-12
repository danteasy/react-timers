import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { secondsToHMSWithDots } from "../lib/seconds-to-HMS";

type Props = {
    elapsed: number;
    duration: number;
    handleReset: () => void;
} & React.ComponentProps<typeof CircularProgress>;

const TimerProgress: React.FC<Props> = ({
    elapsed,
    duration,
    handleReset,
    ...props
}) => {
    const normalise = (value: number) => ((value - 0) * 100) / (duration - 0);

    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                value={normalise(elapsed)}
                variant="determinate"
                size={150}
                thickness={3}
                {...props}
            />
            <CircularProgress
                variant="determinate"
                size={150}
                sx={{
                    color: "#e5e7eb",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "-10",
                }}
                thickness={3}
                value={100}
                {...props}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    fontSize={"2rem"}
                >
                    {elapsed === duration ? (
                        <Button onClick={handleReset}>Restart</Button>
                    ) : (
                        secondsToHMSWithDots(duration - elapsed)
                    )}
                </Typography>
            </Box>
        </Box>
    );
};

export default TimerProgress;
