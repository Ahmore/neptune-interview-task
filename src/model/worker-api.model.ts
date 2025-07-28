import type {Results} from "./results.model.ts";

export type WorkerInput = {
    type: "INIT",
    data: string,
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