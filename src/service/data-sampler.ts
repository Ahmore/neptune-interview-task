import type {InputData} from "../model/input.model.ts";
import type {Aggregates, Output, SampledData} from "../model/output.model.ts";

export function getData(data: InputData, N: number, S: number, downsampleAt: number): Output {
    const dataRange: InputData = getDataRange(data, N, S);
    const aggregates: Aggregates = getAggregates(dataRange);
    const sampledData: SampledData = getSampledData(dataRange, downsampleAt);

    return {
        data: sampledData,
        aggregates: aggregates,
    }
}

function getDataRange(data: InputData, N: number, S: number): InputData {
    return data.slice(S, S + N);
}

function getAggregates(data: InputData): Aggregates {
    let min: number = Infinity;
    let max: number = -Infinity;
    let sum: number = 0;

    for (let i = 0; i < data.length; i++) {
        const y: number = data[i].y;

        if (y < min) {
            min = y;
        }

        if (y > max) {
            max = y;
        }

        sum += y;
    }

    const average: number = sum / data.length;
    let varianceSum: number = 0;

    for (let i = 0; i < data.length; i++) {
        const y: number = data[i].y;
        const diff: number = y - average;
        varianceSum += diff * diff;
    }

    const variance = varianceSum / data.length;

    return {
        min,
        max,
        average,
        variance
    };
}

function getSampledData(data: InputData, downsampleAt: number): SampledData {
    // TODO: Add downsampling
    return data;
}