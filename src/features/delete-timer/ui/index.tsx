import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteTimer, useAppDispatch } from "@/shared/store";
import { CancelConfirmDialog } from "@/shared/ui/dialog-with-confirm-cancel";
import { IconButton, Tooltip } from "@mui/material";
import useModalOpen from "@/shared/hooks/use-modal-open";

export const DeleteTimer = ({
    timersIds,
    onDeleteCb,
}: {
    timersIds: string[];
    onDeleteCb?: () => void;
}) => {
    const dispatch = useAppDispatch();
    const { handleOpen, handleClose, open } = useModalOpen();
    const isArrEmpty = timersIds.length === 0;

    const handleDelete = () => {
        dispatch(deleteTimer(timersIds));
        onDeleteCb && onDeleteCb();
        handleClose();
    };

    return (
        <>
            <Tooltip title="Delete timer">
                <span>
                    <IconButton
                        disabled={isArrEmpty}
                        onClick={() => handleOpen()}
                        className="cursor-pointer"
                    >
                        <DeleteOutlineIcon
                            color={isArrEmpty ? "disabled" : "action"}
                        />
                    </IconButton>
                </span>
            </Tooltip>
            <CancelConfirmDialog
                open={open}
                cancelText="Cancel"
                confirmText="Delete"
                messageNode={
                    <>
                        <p>
                            Are you sure you want to delete
                            {timersIds.length > 1
                                ? " these timers"
                                : " this timer"}
                            ?
                        </p>
                        <p className="text-red-700">
                            This action cannot be undone.
                        </p>
                    </>
                }
                handleCancel={() => handleClose()}
                handleConfirm={handleDelete}
            />
        </>
    );
};
