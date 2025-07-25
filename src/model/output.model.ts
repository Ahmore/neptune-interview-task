export type Aggregates = {
    min: number,
    max: number,
    average: number,
    variance: number,
};
export type SampledData = { x: number; y: number, min?: number, max?: number }[];
export type Output = {
    data: SampledData,
    aggregates: Aggregates,
};