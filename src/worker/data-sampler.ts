import type {Aggregates, Results, SampledData} from "../model/results.model.ts";
import {CONFIG} from "../data/config.ts";
import type {ParsedData} from "../model/parsed-data.model.ts";

export function getData(data: ParsedData, N: number, S: number): Results {
    const dataRange: ParsedData = getDataRange(data, N, S);
    const aggregates: Aggregates = getAggregates(dataRange);
    const sampledData: SampledData = getSampledData(dataRange);

    return {
        data: sampledData,
        aggregates: aggregates,
    }
}

function getDataRange(data: ParsedData, N: number, S: number): ParsedData {
    return [
        data[0].subarray(S, S + N),
        data[1].subarray(S, S + N)
    ];
}

function getAggregates(data: ParsedData): Aggregates {
    let min: number = Infinity;
    let max: number = -Infinity;
    let sum: number = 0;
    const ys: Float32Array = data[1];

    for (let i = 0; i < ys.length; i++) {
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

function getSampledData(data: ParsedData): SampledData {
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

export function downsampleMinMaxMedian(arr: Float32Array, targetLength: number) {
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

        const bucket = arr.subarray(start, end);
        if (bucket.length === 0) continue;

        let min: number = Infinity;
        let max: number = -Infinity;

        for (let j = 0; j < bucket.length; j++) {
            const y: number = bucket[j];

            if (y < min) {
                min = y;
            }

            if (y > max) {
                max = y;
            }
        }

        const avg = (min + max) / 2;

        result[0].push(start + Math.floor(bucket.length / 2));
        result[1].push(avg);
        result[2].push(min);
        result[3].push(max);
    }

    return result;
}