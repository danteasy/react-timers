import { restoreTimerFromTrash, useAppDispatch } from "@/shared/store";
import OverlaysPortal from "@/shared/ui/overlays-portal";
import { Snackbar } from "@mui/material";
import React, { useState } from "react";
interface Props {
    children: React.ReactNode;
    timersIds: string[];
    onRestoreCb?: () => void;
}

export const RestoreTimerFromTrash = ({
    children,
    timersIds,
    onRestoreCb,
}: Props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (timersIds?.length) {
            setOpen(true);
            dispatch(restoreTimerFromTrash(timersIds));
            onRestoreCb && onRestoreCb();
        }
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
            {React.Children.map(children, (child, index) => {
                if (index === 0) {
                    return React.cloneElement(child as React.ReactElement, {
                        onClick: handleClick,
                    });
                }
                return child;
            })}
            <OverlaysPortal>
                <Snackbar
                    sx={{ bottom: "60px" }}
                    open={open}
                    autoHideDuration={3000}
                    message={
                        <span className="mr-4 tex to-blue-500">
                            Restored from trash
                        </span>
                    }
                    onClose={handleClose}
                />
            </OverlaysPortal>
        </>
    );
};
