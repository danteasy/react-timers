import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteSubtimer, useAppDispatch } from "@/shared/store";
import { CancelConfirmDialog } from "@/shared/ui/dialog-with-confirm-cancel";
import { IconButton, Tooltip } from "@mui/material";
import useModalOpen from "@/shared/hooks/use-modal-open";
import { useParams } from "react-router-dom";

export const DeleteSubtimer = ({
    subtimerId,
    onDeleteCb,
}: {
    subtimerId: string;
    onDeleteCb?: () => void;
}) => {
    const dispatch = useAppDispatch();
    const { timerId } = useParams();
    const { handleOpen, handleClose, open } = useModalOpen();

    const handleDelete = () => {
        timerId && dispatch(deleteSubtimer({ subtimerId, timerId }));
        onDeleteCb && onDeleteCb();
        handleClose();
    };

    return (
        <>
            <Tooltip title="Delete">
                <IconButton onClick={handleOpen}>
                    <DeleteOutlineIcon />
                </IconButton>
            </Tooltip>
            <CancelConfirmDialog
                open={open}
                cancelText="Cancel"
                confirmText="Delete"
                messageNode={
                    <p>Are you sure you want to delete this subtimer?</p>
                }
                handleCancel={() => handleClose()}
                handleConfirm={handleDelete}
            />
        </>
    );
};
