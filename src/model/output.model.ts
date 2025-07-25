export type Aggregates = {
    min: number,
    max: number,
    average: number,
    variance: number,
};
export type SampledData = [number[], number[], number[], number[]]; // x[], y[], min[], max[]
export type Output = {
    data: SampledData,
    aggregates: Aggregates,
};