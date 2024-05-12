import React from "react";
import type { subTimer } from "@/enitites/timer";
import PlaybackSubtimersItem from "./playback-subtimers-item";

interface Props {
    subtimers: subTimer[];
    elapsed: number;
}

const PlaybackSubtimersList: React.FC<Props> = ({ subtimers, elapsed }) => {
    const currentSubtimerIndex = (() => {
        let sum = 0;
        for (let i = 0; i < subtimers?.length!; i++) {
            sum += subtimers![i].duration!;
            if (sum > elapsed) return i;
        }
        return -1;
    })();

    const prev = subtimers[currentSubtimerIndex - 1];
    const current = subtimers[currentSubtimerIndex];
    const next = subtimers[currentSubtimerIndex + 1];

    return (
        <ul className="max-w-[80%] md:max-w-full mt-3 text-lg flex flex-col gap-1 [&>li:first-child]:rounded-t-md [&>li:last-child]:rounded-b-md ">
            {!!prev && (
                <PlaybackSubtimersItem
                    subtimer={prev}
                    className="opacity-45"
                    children={
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-0.5 bg-gray-400"></div>
                        </div>
                    }
                ></PlaybackSubtimersItem>
            )}

            <PlaybackSubtimersItem
                subtimer={current}
                className="text-mui-blue [&>div>svg]:fill-mui-blue font-medium [&>span]:font-medium !bg-blue-100"
            />
            {!!next && <PlaybackSubtimersItem subtimer={next} />}
            {subtimers.length - (currentSubtimerIndex + 2) > 0 && (
                <li className="text-right text-sm text-gray-500">
                    <span>
                        ... {subtimers.length - (currentSubtimerIndex + 2)} more
                    </span>
                </li>
            )}
        </ul>
    );
};

export default PlaybackSubtimersList;
