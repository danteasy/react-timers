import React, { useRef, useState } from "react";
import { subTimer } from "@/enitites/timer";
import { SubtimersListItem } from "./subtimers-list-item";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { removePropertiesFromElement } from "../lib/style-remove-properties";
import { moveSubtimer } from "@/shared/store";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "react-responsive";
type Props = {
    subtimers: subTimer[];
};

export const SubtimersList: React.FC<Props> = ({ subtimers }) => {
    const [isDragging, setIsDragging] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const canDraggingBePerformed = useRef(false);
    const draggingLiRef = useRef<HTMLDivElement | null>(null);
    const cloneRef = useRef<HTMLDivElement | null>(null);
    const { timerId } = useParams();
    const dispatch = useAppDispatch();
    const isTouchScreen = useMediaQuery({ query: "(hover: none)" });

    const prevOverChild = useRef<HTMLElement | null>(null);

    const removeStylesOnUnfocus = (removeOpacity: boolean = false) => {
        if (prevOverChild.current) {
            prevOverChild.current.style.removeProperty("padding-top");
            prevOverChild.current.style.removeProperty("padding-bottom");
            prevOverChild.current.classList.remove(
                "border-b-red-600",
                "border-t-red-600"
            );
        }
        if (draggingLiRef.current && removeOpacity) {
            draggingLiRef.current.style.removeProperty("opacity");
        }
        // childrenOfList.forEach(child => {
        //     if (child) {
        //         removePropertiesFromElement(child as HTMLElement, [
        //             "padding-top",
        //             "padding-bottom",
        //             "opacity",
        //         ]);
        //         child.classList.remove("border-b-red-600", "border-t-red-600");
        //     }
        // });
    };

    const dispatchReorderToStore = (droppedSubtimerId: string) => {
        const draggedSubtimerId = draggingLiRef.current?.dataset.id;
        if (draggedSubtimerId && droppedSubtimerId && timerId) {
            dispatch(
                moveSubtimer({
                    timerId,
                    draggedSubtimerId,
                    droppedSubtimerId,
                })
            );
        }
    };

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        if (!canDraggingBePerformed.current) {
            e.preventDefault();
            return;
        }
        setIsDragging(true);
        draggingLiRef.current = e.currentTarget.children[0].closest("div");
        draggingLiRef.current!.style.opacity = "30%";
    };

    const handleDragOver = (
        e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        e.stopPropagation();

        const childrenOfList = Array.from(listRef.current?.children || []);

        const overChildIndex = childrenOfList.findIndex(
            item => item === e.currentTarget
        );

        if (
            draggingLiRef.current !== e.currentTarget &&
            e.currentTarget !== prevOverChild.current
        ) {
            const draggingIndex = childrenOfList.findIndex(
                item => item === draggingLiRef.current
            );

            if (overChildIndex > draggingIndex) {
                e.currentTarget.classList.add("border-b-red-600");
            } else {
                e.currentTarget.classList.add("border-t-red-600");
            }

            (childrenOfList[overChildIndex] as HTMLElement).style[
                overChildIndex > draggingIndex ? "paddingBottom" : "paddingTop"
            ] = `${draggingLiRef.current?.offsetHeight! / 2}px`;

            prevOverChild.current = e.currentTarget;
        }
    };

    const handleDragLeave = (
        e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        e.currentTarget.classList.remove("border-t-red-600");
        if (draggingLiRef.current !== e.currentTarget) {
            prevOverChild && removeStylesOnUnfocus();
        } else if (
            draggingLiRef.current === e.currentTarget &&
            prevOverChild.current
        ) {
            prevOverChild.current = null;
        }
    };
    const resetDragging = () => {
        setIsDragging(false);
        cloneRef.current && listRef.current?.removeChild(cloneRef.current);
        removeStylesOnUnfocus(true);
        cloneRef.current = null;
        prevOverChild.current = null;
        draggingLiRef.current = null;
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedSubtimerId = (e.target as HTMLElement).dataset.id;
        dispatchReorderToStore(droppedSubtimerId!);
    };

    const handleDragEnd = (
        e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        resetDragging();
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!canDraggingBePerformed.current) {
            e.preventDefault();
            return;
        }
        setIsDragging(true);
        draggingLiRef.current = (e.target as HTMLElement).closest(
            "div"
        ) as HTMLDivElement;
        if (draggingLiRef.current) {
            cloneRef.current = draggingLiRef.current.cloneNode(
                true
            ) as HTMLDivElement;
            draggingLiRef.current.style.opacity = "30%";
            listRef.current?.appendChild(cloneRef.current);
            cloneRef.current.classList.add("absolute");
            cloneRef.current.classList.add("z-30");
            cloneRef.current.classList.add("w-full");
            cloneRef.current.style.top = `${
                draggingLiRef.current.getBoundingClientRect().top -
                listRef.current!.getBoundingClientRect().top
            }px`;
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const { clientY, clientX } = e.touches[0];

        const isInsideContainer = () => {
            const rect = listRef.current!.getBoundingClientRect();
            return clientX >= rect.left &&
                clientX <= rect.right &&
                clientY >= rect.top &&
                clientY <= rect.bottom
                ? null
                : (canDraggingBePerformed.current = false);
        };
        isInsideContainer();

        if (!canDraggingBePerformed.current) {
            resetDragging();
            return;
        }

        const childrenOfList: HTMLElement[] = Array.from(
            listRef.current?.children || []
        ).filter((child): child is HTMLElement => child instanceof HTMLElement);

        const overChild = childrenOfList.find(item => {
            const rect = item.getBoundingClientRect();
            const top = rect.top;
            const bottom = top + rect.height;

            return (
                item !== cloneRef.current && top < clientY && bottom > clientY
            );
        });

        if (
            overChild &&
            overChild !== prevOverChild.current &&
            overChild !== draggingLiRef.current
        ) {
            const prevChild = prevOverChild.current;
            prevOverChild.current = overChild;

            if (prevChild) {
                prevChild.classList.remove(
                    "border-b-red-600",
                    "border-t-red-600"
                );
                prevChild.style.paddingTop = "";
                prevChild.style.paddingBottom = "";
            }

            const draggingIndex = childrenOfList.indexOf(
                draggingLiRef.current!
            );
            const overChildIndex = childrenOfList.indexOf(overChild);

            if (overChildIndex > draggingIndex) {
                overChild.classList.add("border-b-red-600");
            } else {
                overChild.classList.add("border-t-red-600");
            }

            overChild.style[
                overChildIndex > draggingIndex ? "paddingBottom" : "paddingTop"
            ] = `${draggingLiRef.current?.offsetHeight! / 2}px`;
        } else if (
            draggingLiRef.current === overChild &&
            prevOverChild.current
        ) {
            prevOverChild.current.classList.remove(
                "border-b-red-600",
                "border-t-red-600"
            );
            prevOverChild.current.style.paddingTop = "";
            prevOverChild.current.style.paddingBottom = "";
            prevOverChild.current = null;
        }

        if (cloneRef.current) {
            cloneRef.current.style.top = `${
                clientY - listRef.current!.getBoundingClientRect().top
            }px`;
        }
        const autoScrolling = () => {
            const scrollThreshold = 35;
            if (
                clientY < scrollThreshold ||
                clientY > window.innerHeight - scrollThreshold
            ) {
                console.log("fire");
                const scrollAmount =
                    clientY < scrollThreshold
                        ? -(window.innerHeight * 0.05)
                        : window.innerHeight * 0.05;
                window.scrollBy(0, scrollAmount);
            }
        };

        autoScrolling();
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const droppedSubtimerId = prevOverChild.current?.dataset.id;
        droppedSubtimerId && dispatchReorderToStore(droppedSubtimerId);

        resetDragging();
    };

    return (
        <>
            <div
                ref={listRef}
                className={`bg-gray-200 shadow-lg rounded-lg relative ${
                    isDragging
                        ? //
                          "[&>div>div>*:nth-child(2)]:opacity-0 [&>div>div>*:nth-child(2)]:pointer-events-none "
                        : ""
                } `}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={() => {
                    canDraggingBePerformed.current = false;
                    setIsDragging(false);
                }}
            >
                {subtimers.map((subtimer, index) => {
                    return (
                        <div
                            key={subtimer.id}
                            data-id={subtimer.id}
                            className={`border-t-2 border-b-2 border-dashed translate-y-0 duration-150 ease-in-out flex items-start pl-4 pr-6 py-2 hover:bg-gray-300 gap-2 ${
                                isDragging
                                    ? ""
                                    : "border-t-transparent border-b-transparent"
                            }`}
                            draggable={true}
                            onDragStart={
                                !isTouchScreen ? handleDragStart : undefined
                            }
                            onDragOver={
                                !isTouchScreen ? handleDragOver : undefined
                            }
                            onDragLeave={
                                !isTouchScreen ? handleDragLeave : undefined
                            }
                            onDrop={!isTouchScreen ? handleDrop : undefined}
                            onDragEnd={
                                !isTouchScreen ? handleDragEnd : undefined
                            }
                        >
                            <IconButton
                                className={`touch-none ${
                                    isDragging ? "pointer-events-none" : ""
                                }`}
                                onMouseEnter={() => {
                                    canDraggingBePerformed.current = true;
                                }}
                                onMouseLeave={() => {
                                    canDraggingBePerformed.current = false;
                                }}
                                onTouchStart={() => {
                                    canDraggingBePerformed.current = true;
                                }}
                                onTouchEnd={() => {
                                    canDraggingBePerformed.current = false;
                                }}
                            >
                                <DragHandleIcon className=" text-gray-400 pointer-events-none " />
                            </IconButton>
                            <SubtimersListItem
                                className={`flex-grow ${
                                    isDragging ? "pointer-events-none" : ""
                                }`}
                                {...{ subtimer, index }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};
