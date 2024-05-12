import React from "react";
import { TimersList } from "@/widgets/timers-list";
import { Button, ButtonGroup, Checkbox } from "@mui/material";
import { useAppSelector } from "@/app/store";
import { Timer } from "@/enitites/timer";
import { useItemsSelect } from "@/shared/hooks/use-items-select";
import { AddTimer } from "@/features/add-timer";
import { Link } from "react-router-dom";
import NoTimers from "./no-timers";
import { TimersControlPanel } from "./timers-control.panel";
import { CloneTimer } from "@/features/clone-timer";

const Home: React.FC = () => {
    const timers = useAppSelector(state => state.timers);
    const {
        selectedItems: selectedTimers,
        SelectButton,
        handleSelect,
        setSelectedItems: setSelectedTimers,
    } = useItemsSelect<Timer>(timers);

    return (
        <div className="animate-fade-in">
            <div>
                <TimersControlPanel
                    selectedTimers={selectedTimers}
                    SelectButton={SelectButton}
                    setSelectedTimers={setSelectedTimers}
                />
                <div>
                    {!!timers.length && (
                        <AddTimer
                            className="md:w-full text-lg text-blue-500 hover:text-blue-600 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:rotate-0 [&:hover>svg]:rotate-90 flex gap-2 items-center mb-2"
                            iconClassName="w-7 h-7 [&>path]:min-w-full [&>path]:min-h-full"
                            iconProps={{
                                fontSize: "large",
                            }}
                        />
                    )}
                </div>
                <TimersList
                    timers={timers}
                    renderCardTop={(timerId: string) => (
                        <Checkbox
                            className="float-right"
                            onClick={() => handleSelect(timerId)}
                            checked={selectedTimers.includes(timerId)}
                        />
                    )}
                    renderCardBottom={(timerId: string) => {
                        return (
                            <div className="flex items-center justify-between mt-2 ">
                                <CloneTimer
                                    className="text-mui-blue"
                                    {...{ timerId }}
                                />
                                <ButtonGroup className="self-end mt-2">
                                    <Link
                                        to={"/overview/" + timerId}
                                        className="text-decoration-none"
                                    >
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                borderRadius: "15px",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    boxShadow: "none",
                                                },
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    {timers?.find(t => t.id === timerId)
                                        ?.subtimers.length !== 0 && (
                                        <Link to={"/playback/" + timerId}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    borderRadius: "15px",
                                                    boxShadow: "none",
                                                    "&:hover": {
                                                        boxShadow: "none",
                                                    },
                                                }}
                                            >
                                                Start
                                            </Button>
                                        </Link>
                                    )}
                                </ButtonGroup>
                            </div>
                        );
                    }}
                    onEmptyNode={() => <NoTimers />}
                />
            </div>
        </div>
    );
};

export default Home;
