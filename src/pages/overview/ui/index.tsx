import React, { useEffect } from "react";
import { updateTimer, useAppDispatch, useAppSelector } from "@/shared/store";
import { useParams } from "react-router-dom";
import { Timer } from "@/enitites/timer";

import { Typography } from "@mui/material";
import { HomePageBtn } from "@/shared/ui/home-page-btn";
import { SubtimersList } from "./subtimers-list";
import { TimerDetails } from "./timer-details";
import { AddSubtimer } from "@/features/add-subtimer";
import { NoSubtimers } from "./no-subtimers";

const Overview: React.FC = () => {
    const { timerId } = useParams();
    const currentTimer = useAppSelector(state => state.timers).find(
        timer => timer.id === timerId
    );

    const dispatch = useAppDispatch();

    const [timerForm, setTimerForm] = React.useState<Timer | undefined>(
        currentTimer
    );

    const handleEditableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!timerForm) return;

        setTimerForm({
            ...timerForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditableCancel = () => {
        setTimerForm(currentTimer);
    };

    const handleEditableConfirm = () => {
        if (
            !timerForm ||
            JSON.stringify(currentTimer) === JSON.stringify(timerForm)
        )
            return;
        dispatch(updateTimer(timerForm));
    };

    useEffect(() => {
        setTimerForm(currentTimer);
    }, [currentTimer]);

    return (
        <div className="pb-10 animate-fade-in">
            <HomePageBtn />
            {timerForm && (
                <>
                    <Typography
                        variant="h3"
                        className="text-center"
                        style={{ marginBottom: "1rem" }}
                    >
                        Overview
                    </Typography>
                    <TimerDetails
                        isButtonDisabled={currentTimer!.subtimers.length === 0}
                        timerForm={timerForm}
                        onCancel={handleEditableCancel}
                        onConfirm={handleEditableConfirm}
                        handleEditableChange={handleEditableChange}
                    />
                    <div>
                        <div className="max-w-[800px] mx-auto">
                            {currentTimer?.subtimers.length ? (
                                <>
                                    <div className="text-lg text-center mt-3">
                                        Subtimers
                                    </div>
                                    <div className="mb-3 mt-2 ">
                                        <AddSubtimer
                                            className="flex items-center gap-1 text-lg text-blue-500 hover:text-blue-600 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:rotate-0 [&:hover>svg]:rotate-90 "
                                            iconClassName="w-7 h-7 [&>path]:min-w-full [&>path]:min-h-full"
                                            iconProps={{
                                                fontSize: "large",
                                            }}
                                        />
                                    </div>

                                    <SubtimersList
                                        subtimers={timerForm.subtimers}
                                    />
                                </>
                            ) : (
                                <NoSubtimers />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Overview;
