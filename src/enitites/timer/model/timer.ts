import type { subTimer } from "./sub-timer";

export type Timer = {
    id: string;
    name: string;
    description: string;
    subtimers: subTimer[];
    duration: number;
    updatedAt: string;
};
