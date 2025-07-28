import type {Output} from "./output.model.ts";

export type ParsedData = [number[], number[]];
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
    data: Output
};