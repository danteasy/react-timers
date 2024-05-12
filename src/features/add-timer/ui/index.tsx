import useModalOpen from "@/shared/hooks/use-modal-open";
import { CancelConfirmDialog } from "@/shared/ui/dialog-with-confirm-cancel";
import InputForm, { FormRef } from "@/shared/ui/input-form";
import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import type { KeyType } from "@/shared/ui/input-form";
import { addTimer, useAppDispatch } from "@/shared/store";

type AddIconProps = React.ComponentProps<typeof AddIcon>;

type AddTimerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    iconClassName?: string;
    iconProps?: AddIconProps;
};

export const AddTimer: React.FC<AddTimerProps> = ({
    iconClassName,
    iconProps,
    ...props
}) => {
    const { open, handleOpen, handleClose } = useModalOpen();
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        handleClose();
    };
    const handleConfirm = () => {
        const values = inputsValues.current?.getValues();
        if (values?.minutes || values?.seconds) {
            dispatch(
                addTimer({
                    name: (values?.name as string) || "",
                    description: (values?.description as string) || "",
                    duration:
                        Number(values.minutes) * 60 + Number(values.seconds) ||
                        0,
                })
            );
        }

        handleClose();
    };

    const inputsValues = useRef<FormRef>(null);

    const keyTypes: KeyType[] = [
        {
            placeholder: "Timer name",
            type: "string",
            key: "name",
            helperText: "Max length: 30",
            props: {
                className: "w-full",
                inputProps: {
                    maxLength: 30,
                },
            },
        },
        {
            placeholder: "Description",
            type: "string",
            key: "description",
            props: {
                className: "w-full mb-4",
                multiline: true,
                minRows: 1,
                maxRows: 6,
                inputProps: {
                    maxLength: 200,
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
                <div>Add a timer</div>
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
