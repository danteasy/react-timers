export { useAppDispatch, useAppSelector } from "@/app/store";
export {
    addTimer,
    deleteTimer,
    updateTimer,
    addSubtimer,
    editSubtimer,
    deleteSubtimer,
    moveTimerToTrash,
    restoreTimerFromTrash,
    cloneTimer,
    moveSubtimer,
} from "@/app/store/slices/global-slice";
