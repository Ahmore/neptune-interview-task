import type {InputData} from "../model/input.model.ts";
import type {Aggregates, Output, SampledData} from "../model/output.model.ts";
import {CONFIG} from "../data/config.ts";

export function getData(data: InputData, N: number, S: number): Output {
    const dataRange: InputData = getDataRange(data, N, S);
    const aggregates: Aggregates = getAggregates(dataRange);
    const sampledData: SampledData = getSampledData(dataRange);

    return {
        data: sampledData,
        aggregates: aggregates,
    }
}

function getDataRange(data: InputData, N: number, S: number): InputData {
    return [
        data[0].slice(S, S + N),
        data[1].slice(S, S + N)
    ];
}

function getAggregates(data: InputData): Aggregates {
    let min: number = Infinity;
    let max: number = -Infinity;
    let sum: number = 0;
    const ys: number[] = data[1];

    for (let i = 0; i < data.length; i++) {
        const y: number = ys[i];

        if (y < min) {
            min = y;
        }

        if (y > max) {
            max = y;
        }

        sum += y;
    }

    const average: number = sum / ys.length;
    let varianceSum: number = 0;

    for (let i = 0; i < ys.length; i++) {
        const y: number = ys[i];
        const diff: number = y - average;
        varianceSum += diff * diff;
    }

    const variance = varianceSum / ys.length;

    return {
        min,
        max,
        average,
        variance
    };
}

function getSampledData(data: InputData): SampledData {
    if (data[1].length <= CONFIG.MAX_POINTS_TO_RENDER) {
        return [
            data[0],
            data[1],
            [],
            []
        ];
    }

    return downsampleMinMaxMedian(data[1], CONFIG.MAX_POINTS_TO_RENDER)
}

export function downsampleMinMaxMedian(arr: number[], targetLength: number) {
    const result: [number[], number[], number[], number[]] = [
        [],
        [],
        [],
        []
    ];
    const bucketSize = arr.length / targetLength;

    for (let i = 0; i < targetLength; i++) {
        const start = Math.floor(i * bucketSize);
        const end = Math.min(Math.floor((i + 1) * bucketSize), arr.length);

        const bucket = arr.slice(start, end);
        if (bucket.length === 0) continue;

        const sorted = [...bucket].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];

        const min = sorted[0];
        const max = sorted[sorted.length - 1];

        result[0].push(start + mid);
        result[1].push(median);
        result[2].push(min);
        result[3].push(max);
    }

    return result;
}