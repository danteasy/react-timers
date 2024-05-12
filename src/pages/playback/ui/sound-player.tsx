import React, { useState, useEffect } from "react";
import TimerClick from "@/assets/timer/timer-click.mp3";

interface Props {
    delayMs: number;
    canPlay: boolean;
}

export const SoundPlayer: React.FC<Props> = ({ delayMs, canPlay }) => {
    const [audio] = useState<HTMLAudioElement>(new Audio(TimerClick));
    const [hasStarted, setHasStarted] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timer;
        const playSound = () => {
            if (audio && canPlay && audio.paused && hasStarted) {
                audio
                    .play()
                    .then(() => {
                        timeoutId = setTimeout(playSound, delayMs); // Set timeout for next play
                    })
                    .catch(error => {
                        console.error("Error playing audio:", error);
                    });
            }
        };

        playSound();

        return () => {
            clearTimeout(timeoutId);
            if (audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [audio, delayMs, canPlay, hasStarted]);

    useEffect(() => {
        if (!canPlay && audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }

        const interval = setInterval(() => {
            setHasStarted(true);
        }, delayMs);

        return () => {
            setHasStarted(false);
            clearInterval(interval);
        };
    }, [canPlay, audio, delayMs]);

    return null;
};

export default SoundPlayer;
