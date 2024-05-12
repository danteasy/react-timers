import { FormHelperText, FormLabel } from "@mui/material";
import Input from "@mui/material/Input";
import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface KeyType {
    placeholder: string;
    type: "string" | "number";
    key: string;
    label?: string;
    helperText?: string;
    props?: React.ComponentProps<typeof Input> & { value?: string | number };
}

type Props = {
    keyTypes: KeyType[];
} & React.HTMLAttributes<HTMLDivElement>;

interface FormValues {
    [key: string]: string | number | undefined;
}

export interface FormRef {
    getValues: () => FormValues;
    handleChangeWithRef: (key: string, value: string | number) => void;
}

const InputForm: React.ForwardRefRenderFunction<FormRef, Props> = (
    { keyTypes, ...props },
    ref
) => {
    const [values, setValues] = useState<FormValues>(
        keyTypes.reduce((acc, keyType) => {
            acc[keyType.key] = keyType.props?.value || "";
            return acc;
        }, {} as FormValues)
    );

    const handleChangeWithRef = (key: string, value: string | number) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleChange = (key: string, value: string | number) => {
        const type = keyTypes.find(k => k.key === key)!.type;
        setValues(prevValues => ({
            ...prevValues,
            [key]: type === "number" ? Number(value) : value,
        }));
    };

    useImperativeHandle(ref, () => ({
        getValues() {
            return values;
        },
        handleChangeWithRef,
    }));

    return (
        <div className="" {...props}>
            {keyTypes.map(keyType => (
                <React.Fragment key={keyType.key}>
                    {!!keyType.label && (
                        <FormLabel key={keyType.label}>
                            {keyType.label}
                        </FormLabel>
                    )}
                    <Input
                        key={keyType.key}
                        type={keyType.type === "number" ? "number" : "text"}
                        placeholder={keyType.placeholder}
                        onChange={e =>
                            handleChange(keyType.key, e.target.value)
                        }
                        {...keyType.props}
                        value={values[keyType.key]}
                    />
                    {!!keyType.helperText && (
                        <FormHelperText key={keyType.helperText}>
                            {keyType.helperText}
                        </FormHelperText>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default forwardRef(InputForm);
