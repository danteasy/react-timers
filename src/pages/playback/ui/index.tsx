import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { HomePageBtn } from "@/shared/ui/home-page-btn";
import { useAppSelector } from "@/shared/store";
import TimerProgress from "./timer-progress";
import SoundPlayer from "./sound-player";

import useSound from "use-sound";
import timerPlaybackEnd from "@/assets/timer/timer-playback-end.mp3";
import PlaybackControlPanel from "./playback-control-panel";
import PlaybackSubtimersList from "./playback-subtimers-list";

export const PlaybackPage = () => {
    const { timerId } = useParams();

    const currentTimer = useAppSelector(state => state.timers).find(
        timer => timer.id === timerId
    );

    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [elapsed, setElapsed] = useState<number>(0);
    const [isClickSound, setIsClickSound] = useState<boolean>(true);

    const [playEndSound] = useSound(timerPlaybackEnd);

    const handleReset = () => {
        setElapsed(0);
        setIsPlaying(true);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (elapsed === currentTimer?.duration! - 1) {
                setIsPlaying(false);
                setIsClickSound(false);
                playEndSound();
            }
            if (isPlaying) {
                setElapsed(elapsed => elapsed + 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };

        //eslint-disable-next-line
    }, [isPlaying, elapsed]);

    return (
        <div className="animate-fade-in">
            <HomePageBtn />
            <div className="mx-auto text-center mt-[15vh] flex flex-col gap-1 items-center">
                <TimerProgress
                    duration={currentTimer?.duration!}
                    elapsed={elapsed}
                    handleReset={handleReset}
                />
                {!(elapsed === currentTimer?.duration) && (
                    <PlaybackControlPanel
                        {...{
                            handleReset,
                            isClickSound,
                            setIsClickSound,
                            isPlaying,
                            setIsPlaying,
                        }}
                    />
                )}
                {!!(elapsed !== currentTimer?.duration) && (
                    <PlaybackSubtimersList
                        {...{ elapsed, subtimers: currentTimer?.subtimers! }}
                    />
                )}
                {isClickSound && (
                    <SoundPlayer canPlay={isPlaying} delayMs={1000} />
                )}
            </div>
        </div>
    );
};
