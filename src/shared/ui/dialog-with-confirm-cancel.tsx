import { Dialog, DialogTitle, DialogActions } from "@mui/material";

type Props = {
    open: boolean;
    messageNode: React.ReactElement;
    handleCancel: () => void;
    handleConfirm: () => void;
    cancelText: string;
    confirmText: string;
};

export const CancelConfirmDialog: React.FC<Props> = ({
    open,
    handleCancel,
    handleConfirm,
    messageNode,
    cancelText,
    confirmText,
}): React.ReactElement => {
    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>{messageNode}</DialogTitle>
            <DialogActions>
                <button
                    onClick={handleCancel}
                    className="bg-slate-100 hover:bg-slate-200 py-1 px-2 rounded-md"
                >
                    {cancelText}
                </button>
                <button
                    className="text-white bg-blue-600 py-1 px-2 rounded-md hover:bg-blue-700"
                    onClick={handleConfirm}
                >
                    {confirmText}
                </button>
            </DialogActions>
        </Dialog>
    );
};
