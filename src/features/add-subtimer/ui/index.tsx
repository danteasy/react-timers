import useModalOpen from "@/shared/hooks/use-modal-open";
import { CancelConfirmDialog } from "@/shared/ui/dialog-with-confirm-cancel";
import InputForm, { FormRef } from "@/shared/ui/input-form";
import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import type { KeyType } from "@/shared/ui/input-form";
import { addSubtimer, useAppDispatch } from "@/shared/store";
import { useParams } from "react-router-dom";

type AddIconProps = React.ComponentProps<typeof AddIcon>;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    iconClassName?: string;
    iconProps?: AddIconProps;
};

export const AddSubtimer: React.FC<Props> = ({
    iconClassName,
    iconProps,
    ...props
}) => {
    const { open, handleOpen, handleClose } = useModalOpen();
    const { timerId } = useParams();

    const dispatch = useAppDispatch();

    const inputsValues = useRef<FormRef>(null);

    const handleCancel = () => {
        handleClose();
    };
    const handleConfirm = () => {
        handleClose();
        if (inputsValues.current && timerId) {
            let { minutes, seconds, name } = inputsValues.current.getValues();
            minutes = minutes ? +minutes : 0;
            seconds = seconds ? +seconds : 0;
            const duration = Number(minutes) * 60 + Number(seconds);
            if (duration > 0) {
                dispatch(
                    addSubtimer({
                        timerId,
                        duration,
                        name: name as string,
                    })
                );
            }
        }
    };

    const keyTypes: KeyType[] = [
        {
            placeholder: "Subtimer name",
            type: "string",
            key: "name",
            helperText: "Max length: 30",
            props: {
                className: "w-full",
                multiline: true,
                minRows: 1,
                maxRows: 3,
                inputProps: {
                    maxLength: 30,
                },
            },
        },
        {
            placeholder: "Minutes",
            type: "number",
            key: "minutes",

            props: {
                className: "w-[50%]",
                inputProps: {
                    maxLength: 3,
                    min: 0,
                    onBlur: e => {
                        if (+e.currentTarget.value > 999) {
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
                className: "w-[50%]",
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
            },
        },
    ];

    return (
        <>
            <button {...props} onClick={handleOpen}>
                <AddIcon className={`${iconClassName}`} {...iconProps} />
                <div>Add a subtimer</div>
            </button>
            <CancelConfirmDialog
                open={open}
                cancelText="Cancel"
                confirmText="Add"
                handleCancel={() => handleCancel()}
                handleConfirm={handleConfirm}
                messageNode={
                    <InputForm ref={inputsValues} keyTypes={keyTypes} />
                }
            />
        </>
    );
};
