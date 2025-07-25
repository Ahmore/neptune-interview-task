import type {Input, InputData} from "../../model/input.model.ts";
import {Controls} from "../controls/controls.tsx";
import {type RefObject, useCallback, useEffect, useRef, useState} from "react";
import workerUrl from "../../worker?worker&url";
import type {Output} from "../../model/output.model.ts";
import {Aggregates} from "../aggregated/aggregates.tsx";
import {Plot} from "../plot/plot.tsx";

export function GraphContainer({inputData}: { inputData: InputData }) {
    const worker: RefObject<Worker> = useRef(new Worker(workerUrl, {type: "module"}));
    const [sampledData, setSampledData] = useState<Output | undefined>(undefined);

    // When a new configuration comes get fresh data
    const onControlsChange = useCallback((N: number, S: number, P: number, reset: boolean) => {
        console.log("NEW CONFIGURATION", N, S, P, reset);
        const workerInput: Input = {
            data: inputData,
            N,
            S,
            P,
            downsampleAt: 10 ^ 6, // REFACTOR
        };

        worker.current.postMessage(workerInput);
    }, [inputData]);

    // Cleanup
    useEffect(() => {
        const workerCurrent: Worker = worker.current;

        workerCurrent.onmessage = function (e) {
            console.log("WORKER OUTPUT", e.data);

            setSampledData(e.data);
        }

        return () => {
            workerCurrent.terminate();
        }
    }, []);

    return <>
        <Controls dataLength={inputData[0].length} onChange={onControlsChange}></Controls>
        { sampledData && <Aggregates data={ sampledData.aggregates }></Aggregates> }
        { sampledData && <Plot data={ sampledData.data }></Plot> }
    </>
}