import useModalOpen from "@/shared/hooks/use-modal-open";
import { CancelConfirmDialog } from "@/shared/ui/dialog-with-confirm-cancel";
import InputForm, { FormRef } from "@/shared/ui/input-form";
import { useRef } from "react";
import type { KeyType } from "@/shared/ui/input-form";
import EditIcon from "@mui/icons-material/Edit";
import { editSubtimer, useAppDispatch, useAppSelector } from "@/shared/store";
import { useParams } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";

type Props = React.ComponentProps<typeof Button> & {
    subtimerId: string;
};

export const EditSubtimer: React.FC<Props> = ({
    className,
    subtimerId,
    ...props
}) => {
    const { open, handleOpen, handleClose } = useModalOpen();
    const { timerId } = useParams();
    const timer = useAppSelector(state => state.timers).find(
        t => t.id === timerId
    );
    const subtimer = timer?.subtimers.find(s => s.id === subtimerId);

    const durationValues = {
        minutes: (subtimer?.duration! - (subtimer?.duration! % 60)) / 60,
        seconds: subtimer?.duration! % 60,
    };

    const dispatch = useAppDispatch();

    const inputsValues = useRef<FormRef>(null);

    const handleCancel = () => {
        handleClose();
    };
    const handleConfirm = () => {
        handleClose();
        const values = inputsValues.current?.getValues();
        if (values && timerId) {
            let { minutes, seconds } = values;
            minutes = minutes || 0;
            seconds = seconds || 0;

            dispatch(
                editSubtimer({
                    timerId,
                    subtimerId,
                    subtimer: {
                        name: values.name as string,
                        duration: Number(minutes) * 60 + Number(seconds),
                    },
                })
            );
        }
    };

    const keyTypes: KeyType[] = [
        {
            placeholder: "Subtimer name",
            type: "string",
            key: "name",
            props: {
                value: subtimer?.name,
                className: "w-full",
                inputProps: {},
            },
        },
        {
            placeholder: "Minutes",
            type: "number",
            key: "minutes",
            props: {
                value: durationValues.minutes,
                className: "w-[50%]",
                inputProps: {
                    min: 0,
                    max: 999,
                    maxLength: 3,
                    onBlur: e => {
                        const val = +e.currentTarget.value;
                        if (val > 999) {
                            inputsValues.current?.handleChangeWithRef(
                                "minutes",
                                999
                            );
                        }
                    },
                },
            },
        },
        {
            placeholder: "Seconds",
            type: "number",
            key: "seconds",
            props: {
                value: durationValues.seconds,
                inputProps: {
                    min: 0,
                    max: 59,
                    maxLength: 2,
                    onBlur: e => {
                        if (+e.currentTarget.value > 59) {
                            inputsValues.current?.handleChangeWithRef(
                                "seconds",
                                59
                            );
                        }
                    },
                },
                className: "w-[50%]",
            },
        },
    ];

    return (
        <>
            <Tooltip title="Edit">
                <IconButton onClick={handleOpen} {...props}>
                    <EditIcon />
                </IconButton>
            </Tooltip>

            <CancelConfirmDialog
                open={open}
                cancelText="Cancel"
                confirmText="Apply"
                handleCancel={() => handleCancel()}
                handleConfirm={handleConfirm}
                messageNode={
                    <InputForm
                        className="min-w-[200px]"
                        ref={inputsValues}
                        keyTypes={keyTypes}
                    />
                }
            />
        </>
    );
};
