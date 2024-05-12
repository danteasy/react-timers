import React, { useEffect, useRef, useState } from "react";
import { MoveTimerToTrash } from "@/features/move-timer-to-trash";
import { Toolbar, useMediaQuery } from "@mui/material";
interface Props {
    selectedTimers: string[];
    setSelectedTimers: React.Dispatch<React.SetStateAction<string[]>>;
    SelectButton: () => React.ReactNode;
}

export const TimersControlPanel: React.FC<Props> = ({
    selectedTimers,
    setSelectedTimers,
    SelectButton,
}) => {
    const [isSticky, setIsSticky] = useState(false);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 767px)");

    useEffect(() => {
        const handleScroll = () => {
            if (toolbarRef.current && isMobile) {
                const offset = +window
                    .getComputedStyle(document.documentElement)
                    .fontSize.slice(0, -2); // get the value of 1 rem
                if (window.scrollY >= offset) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [toolbarRef, isMobile]);

    return (
        <>
            <div
                className={`md:sticky md:top-0 z-20  ${
                    isSticky ? "pt-4 bg-white  [&>div]:border-gray-200" : ""
                }`}
                ref={toolbarRef}
            >
                <Toolbar
                    className="bg-gray-200 mb-2 rounded-full justify-between w-full opacity-100"
                    variant="dense"
                >
                    <MoveTimerToTrash
                        timersIds={selectedTimers}
                        onDeleteCb={() => setSelectedTimers([])}
                    />
                    <div>{SelectButton()}</div>
                </Toolbar>
            </div>
        </>
    );
};
