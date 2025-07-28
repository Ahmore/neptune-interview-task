export type InputData = [number[], number[]]; // x[], y[]
export type ParsedData = [number[], number[]];
export type WorkerApi = {
    type: "INIT",
    data: string,
} | {
    type: "RENDER",
    N: number,
    S: number,
    P: number,
    reset: boolean,
};