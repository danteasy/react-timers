import { Grid } from "@mui/material";
import { Timer, TimerEntity } from "@/enitites/timer";
import React from "react";

type Props = {
    renderCardTop?: (timerId: string) => React.ReactNode;
    renderCardBottom?: (timerId: string) => React.ReactNode;
    timers: Timer[];
    onEmptyNode: () => React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const TimersList: React.FC<Props> = ({
    className = "",
    renderCardBottom,
    renderCardTop,
    timers,
    onEmptyNode,
}) => {
    return (
        <div className={`md:flex md:flex-wrap ${className}`}>
            {timers.length ? (
                <>
                    <Grid
                        container
                        spacing={2}
                        className="md:flex md:flex-wrap"
                    >
                        {timers.map(timer => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={timer.id + "grid"}
                                >
                                    <TimerEntity
                                        timer={timer}
                                        renderTop={() => {
                                            return renderCardTop
                                                ? renderCardTop(timer.id)
                                                : null;
                                        }}
                                        renderBottom={() => {
                                            return renderCardBottom
                                                ? renderCardBottom(timer.id)
                                                : null;
                                        }}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            ) : (
                <div className="pt-4">{onEmptyNode()}</div>
            )}
        </div>
    );
};

export { TimersList };
