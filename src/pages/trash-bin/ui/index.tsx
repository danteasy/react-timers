import React from "react";
import { TimersList } from "@/widgets/timers-list";
import { DeleteTimer } from "@/features/delete-timer";
import { Button, Checkbox, IconButton, Toolbar, Tooltip } from "@mui/material";
import { useAppSelector } from "@/app/store";
import { Timer } from "@/enitites/timer";
import { useItemsSelect } from "@/shared/hooks/use-items-select";
import { RestoreTimerFromTrash } from "@/features/restore-timer";
import RestoreIcon from "@mui/icons-material/Restore";

export const TrashBin: React.FC = () => {
    const timers = useAppSelector(state => state.trash);
    const {
        selectedItems: selectedTimers,
        SelectButton,
        handleSelect,
        setSelectedItems: setSelectedTimers,
    } = useItemsSelect<Timer>(timers);

    return (
        <div className="animate-fade-in">
            <Toolbar
                className="bg-gray-200 mb-2 rounded-full justify-between w-full "
                variant="dense"
            >
                <div>
                    <DeleteTimer
                        timersIds={selectedTimers}
                        onDeleteCb={() => setSelectedTimers([])}
                    />
                    <RestoreTimerFromTrash timersIds={selectedTimers}>
                        <Tooltip title="Restore">
                            <span>
                                <IconButton disabled={!selectedTimers.length}>
                                    <RestoreIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </RestoreTimerFromTrash>
                </div>
                <div>{SelectButton()}</div>
            </Toolbar>
            <TimersList
                timers={timers}
                renderCardTop={(timerId: string) => (
                    <Checkbox
                        className="float-right"
                        onClick={() => handleSelect(timerId)}
                        checked={selectedTimers.includes(timerId)}
                    />
                )}
                renderCardBottom={(timerId: string) => (
                    <RestoreTimerFromTrash timersIds={[timerId]}>
                        <Button variant="text" className="float-right">
                            Restore
                        </Button>
                    </RestoreTimerFromTrash>
                )}
                onEmptyNode={() => {
                    return (
                        <div className="text-center text-3xl">Such empty!</div>
                    );
                }}
            />
        </div>
    );
};
