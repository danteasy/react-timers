import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Timer, subTimer } from "@/enitites/timer";
import { nanoid } from "nanoid";

interface initState {
    timers: Timer[];
    trash: Timer[];
}

const initialState = {
    timers: [],
    trash: [],
} satisfies initState as initState;

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        addTimer(
            state,
            action: PayloadAction<{
                name: string;
                description: string;
                duration: number;
            }>
        ) {
            state.timers.push({
                id: nanoid(15),
                name:
                    action.payload.name.trim() ||
                    "Timer " + (state.timers.length + 1),
                description: action.payload.description || "Description",
                subtimers: [
                    {
                        id: nanoid(15),
                        name: "Subtimer 1",
                        duration: action.payload.duration || 0,
                    },
                ],
                duration: action.payload.duration,
                updatedAt: new Date().toISOString(),
            });
        },
        deleteTimer(state, action: PayloadAction<string[]>) {
            state.trash = state.trash.filter(
                timer => !action.payload.includes(timer.id)
            );
        },
        updateTimer(state, action: PayloadAction<Timer>) {
            const { description, name } = action.payload;
            const timerIndex = state.timers.findIndex(
                timer => timer.id === action.payload.id
            );

            const updatedTimer = {
                ...action.payload,
                name: name.trim() || "Timer " + (timerIndex + 1),
                description: description.trim() || "Description",
                subtimers: action.payload.subtimers.map((subtimer, idx) => {
                    return {
                        ...subtimer,
                        action: subtimer.name.trim() || "Action " + (idx + 1),
                    };
                }),
                updatedAt: new Date().toISOString(),
            };

            state.timers[timerIndex] = updatedTimer;
        },
        addSubtimer(
            state,
            action: PayloadAction<
                Omit<subTimer, "id"> & {
                    timerId: string;
                    name: string | undefined;
                }
            >
        ) {
            const timerIndex = state.timers.findIndex(
                timer => timer.id === action.payload.timerId
            );

            state.timers[timerIndex].subtimers.push({
                id: nanoid(15),
                name:
                    action.payload.name.trim() ||
                    "Subtimer " +
                        (state.timers[timerIndex].subtimers.length + 1),
                duration: action.payload.duration,
            });
            state.timers[timerIndex].duration += action.payload.duration;
            state.timers[timerIndex].updatedAt = new Date().toISOString();
        },
        deleteSubtimer(
            state,
            action: PayloadAction<{ timerId: string; subtimerId: string }>
        ) {
            const timerIndex = state.timers.findIndex(
                timer => timer.id === action.payload.timerId
            );
            const currentTimer = state.timers[timerIndex];

            currentTimer.duration -= currentTimer.subtimers.find(
                subtimer => subtimer.id === action.payload.subtimerId
            )!.duration;

            currentTimer.subtimers = currentTimer.subtimers.filter(
                subtimer => subtimer.id !== action.payload.subtimerId
            );
            currentTimer.updatedAt = new Date().toISOString();
        },
        editSubtimer(
            state,
            action: PayloadAction<{
                timerId: string;
                subtimerId: string;
                subtimer: {
                    duration: number;
                    name: string;
                };
            }>
        ) {
            const timerIndex = state.timers.findIndex(
                timer => timer.id === action.payload.timerId
            );
            const currentTimer = state.timers[timerIndex];
            const subtimerIndex = currentTimer.subtimers.findIndex(
                subtimer => subtimer.id === action.payload.subtimerId
            );

            currentTimer.duration -=
                currentTimer.subtimers[subtimerIndex].duration;

            currentTimer.duration += action.payload.subtimer.duration;

            const newSubtimer = {
                ...action.payload.subtimer,
                id: action.payload.subtimerId,
            };

            currentTimer.subtimers[subtimerIndex] = newSubtimer;

            currentTimer.updatedAt = new Date().toISOString();
        },

        moveTimerToTrash(state, action: PayloadAction<string[]>) {
            action.payload.forEach(id => {
                const timer = state.timers.find(timer => timer.id === id);
                if (timer) {
                    state.trash.push(timer);
                    state.timers = state.timers.filter(
                        timer => timer.id !== id
                    );
                }
            });
        },
        restoreTimerFromTrash(state, action: PayloadAction<string[]>) {
            action.payload.forEach(id => {
                const timer = state.trash.find(timer => timer.id === id);
                if (timer) {
                    state.timers.push(timer);
                    state.trash = state.trash.filter(timer => timer.id !== id);
                }
            });
        },
        cloneTimer(state, action: PayloadAction<string>) {
            const timer = state.timers.find(
                timer => timer.id === action.payload
            );
            state.timers.push(
                JSON.parse(JSON.stringify({ ...timer, id: nanoid(15) }))
            );
        },
        moveSubtimer(
            state,
            action: PayloadAction<{
                timerId: string;
                draggedSubtimerId: string;
                droppedSubtimerId: string;
            }>
        ) {
            const { draggedSubtimerId, droppedSubtimerId, timerId } =
                action.payload;

            const timer = state.timers.find(timer => timer.id === timerId);
            const draggedIndex = timer?.subtimers.findIndex(
                subtimer => subtimer.id === draggedSubtimerId
            );
            const droppedIndex = timer?.subtimers.findIndex(
                subtimer => subtimer.id === droppedSubtimerId
            );
            if (
                draggedIndex !== undefined &&
                droppedIndex !== undefined &&
                timer
            ) {
                const newSubtimers = [...timer.subtimers];
                const [draggedSubtimer] = newSubtimers.splice(draggedIndex, 1);
                newSubtimers.splice(droppedIndex, 0, draggedSubtimer);
                timer.subtimers = newSubtimers;
            }
        },
    },
});

export const {
    addTimer,
    deleteTimer,
    updateTimer,
    addSubtimer,
    deleteSubtimer,
    editSubtimer,
    moveTimerToTrash,
    cloneTimer,
    restoreTimerFromTrash,
    moveSubtimer,
} = globalSlice.actions;
export default globalSlice.reducer;
