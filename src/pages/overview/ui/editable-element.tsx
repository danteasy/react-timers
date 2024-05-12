import { Button, ButtonGroup, IconButton, Input } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useMediaQuery } from "react-responsive";

type Props = {
    children: React.ReactNode;
    className?: string;
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    isEditingProp?: boolean;
    onConfirm: () => void;
    inputProps: React.ComponentProps<typeof Input> & {
        value: string;
        name: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editMenuPlacement?: "top" | "bottom" | "left" | "right";
    editMenuClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const placementMap = {
    top: "origin-top-right left-0",
    bottom: "origin-bottom-right left-0",
    left: "origin-center left-0",
    right: "origin-center right-0",
};

export const EditableElement: React.FC<Props> = ({
    children,
    onCancel,
    onConfirm,
    cancelText = "Cancel",
    confirmText = "Confirm",
    className = "",
    onChange,
    inputProps,
    editMenuPlacement = "right",
    editMenuClassName = "",
    isEditingProp = false,
    ...props
}) => {
    const [isEditing, setIsEditing] = useState(isEditingProp);

    const handleCancel = () => {
        setIsEditing(false);
        onCancel && onCancel();
    };

    const handleConfirm = () => {
        setIsEditing(false);
        onConfirm();
    };
    const isTouchScreen = useMediaQuery({ query: "(hover: none)" });

    return (
        <div
            className={`relative [&:hover>div:first-of-type]:opacity-100 [&:hover>div:first-of-type]:pointer-events-auto ${className} ${
                isTouchScreen && !isEditing
                    ? "flex items-center justify-between"
                    : ""
            }`}
        >
            {isEditing ? (
                <Input
                    className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-0"
                    multiline
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(e)
                    }
                    style={{ padding: "0" }}
                    {...inputProps}
                    autoFocus
                />
            ) : (
                <>{children}</>
            )}
            <div
                className={`${
                    isEditing
                        ? `absolute z-20`
                        : `${
                              isTouchScreen
                                  ? "opacity-100 block"
                                  : "opacity-0 translate-y-[-50%] absolute"
                          } pointer-events-none top-[50%]`
                } gap-2 items-center rounded-lg z-10 ${
                    placementMap[editMenuPlacement]
                } ${editMenuClassName}`}
                {...props}
            >
                {isEditing ? (
                    <>
                        <ButtonGroup className="bg-white">
                            <Button onClick={handleCancel}>{cancelText}</Button>
                            <Button onClick={handleConfirm}>
                                {confirmText}
                            </Button>
                        </ButtonGroup>
                    </>
                ) : (
                    <IconButton
                        onClick={() => {
                            setIsEditing(prev => !prev);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
};
