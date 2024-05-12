import React from "react";

import formatDate from "@/enitites/timer/lib/format-date";
import secondsToHMS from "@/shared/lib/seconds-to-HMS";

import { Button, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { EditableElement } from "./editable-element";

import { Timer } from "@/enitites/timer/model/timer";
import { Link, useParams } from "react-router-dom";

type Props = {
    timerForm: Timer;
    handleEditableChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirm: () => void;
    onCancel: () => void;
    isButtonDisabled: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const TimerDetails: React.FC<Props> = ({
    timerForm,
    handleEditableChange,
    onConfirm,
    onCancel,
    isButtonDisabled,
    ...props
}) => {
    const { timerId } = useParams();

    return (
        <div className="bg-gray-200 py-2 px-4 rounded-xl shadow-md">
            <EditableElement
                onConfirm={() => onConfirm()}
                onCancel={onCancel}
                editMenuPlacement="right"
                inputProps={{
                    value: timerForm.name,
                    name: "name",
                    style: { fontSize: "2.125rem" },
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEditableChange(e)
                }
            >
                <Typography
                    variant="h4"
                    style={{
                        wordBreak: "break-word",
                        marginBottom: "1rem",
                    }}
                >
                    {timerForm.name}
                </Typography>
            </EditableElement>
            <EditableElement
                onConfirm={() => onConfirm()}
                onCancel={onCancel}
                inputProps={{
                    value: timerForm.description,
                    name: "description",
                    style: { fontSize: "1.2rem" },
                }}
                editMenuPlacement="right"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEditableChange(e)
                }
            >
                <Typography
                    variant="body1"
                    style={{
                        marginBottom: "1rem",
                    }}
                >
                    {timerForm.description}
                </Typography>
            </EditableElement>

            <div className="flex items-center mb-2">
                <AccessTimeIcon fontSize="small" />
                <Typography
                    variant="body2"
                    style={{
                        marginLeft: "0.5rem",
                    }}
                >
                    {secondsToHMS(timerForm.duration)
                        ? `Total: ${secondsToHMS(timerForm.duration)}`
                        : "No duration"}
                </Typography>
            </div>

            <div className="flex items-center mb-2">
                <EditNoteIcon fontSize="small" />
                <Typography
                    variant="body2"
                    style={{
                        marginLeft: "0.5rem",
                    }}
                >
                    {formatDate(timerForm.updatedAt)}
                </Typography>
            </div>

            <div className="text-right">
                <Button
                    to={"/playback/" + timerId!}
                    component={Link}
                    variant="contained"
                    disabled={isButtonDisabled}
                    sx={{
                        borderRadius: "15px",
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                            opacity: 0.9,
                        },
                    }}
                >
                    Start
                </Button>
            </div>
        </div>
    );
};
