import type {Results} from "./results.model.ts";

export type WorkerInput = {
    type: "INIT",
    data: {
        offset: number,
        data: [number, number][],
    },
} | {
    type: "RENDER",
    data: {
        N: number,
        S: number,
        P: number,
        reset: boolean,
    }
};
export type WorkerOutput = {
    type: "INIT",
    data: number,
} | {
    type: "RENDER",
    data: Results
};