import React from "react";
import { createPortal } from "react-dom";

interface Props {
    children?: React.ReactNode;
}

const OverlaysPortal: React.FC<Props> = ({ children }) => {
    const overlayContainer =
        document.getElementById("overlays") || document.body;

    if (!React.isValidElement(children)) {
        return null;
    }

    return createPortal(React.cloneElement(children), overlayContainer);
};

export default OverlaysPortal;
