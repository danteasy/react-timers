import { Tooltip, IconButton, Snackbar, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { moveTimerToTrash, useAppDispatch } from "@/shared/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import OverlaysPortal from "@/shared/ui/overlays-portal";

type Props = {
    timersIds: string[];
    onDeleteCb: () => void;
};

export const MoveTimerToTrash: React.FC<Props> = ({
    timersIds,
    onDeleteCb,
}) => {
    const [open, setOpen] = useState(false);
    const isArrEmpty = !timersIds.length;
    const dispatch = useAppDispatch();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Move to trash">
                <span>
                    <IconButton
                        disabled={isArrEmpty}
                        onClick={() => {
                            onDeleteCb && onDeleteCb();
                            dispatch(moveTimerToTrash(timersIds));
                            handleClick();
                        }}
                        className="cursor-pointer"
                    >
                        <DeleteOutlineIcon
                            color={isArrEmpty ? "disabled" : "action"}
                        />
                    </IconButton>
                </span>
            </Tooltip>
            <OverlaysPortal>
                <Snackbar
                    sx={{ bottom: "60px" }}
                    open={open}
                    autoHideDuration={3000}
                    message={
                        <>
                            <span className="mr-4 to-blue-500">
                                Moved to trash
                            </span>
                            <Button variant="text" sx={{ color: "#5897fb" }}>
                                <Link to="/trash">See</Link>
                            </Button>
                        </>
                    }
                    onClose={handleClose}
                />
            </OverlaysPortal>
        </>
    );
};
