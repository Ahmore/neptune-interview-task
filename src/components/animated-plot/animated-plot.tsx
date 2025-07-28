import type {Input, InputData} from "../../model/input.model.ts";
import {Controls} from "../controls/controls.tsx";
import {type RefObject, useCallback, useEffect, useRef, useState} from "react";
import workerUrl from "../../worker?worker&url";
import type {Output} from "../../model/output.model.ts";
import {Aggregates} from "../aggregated/aggregates.tsx";
import {Plot} from "../plot/plot.tsx";
import {CONFIG} from "../../data/config.ts";

export function AnimatedPlot({inputData}: { inputData: InputData }) {
    const worker: RefObject<Worker> = useRef(new Worker(workerUrl, {type: "module"}));
    const [sampledData, setSampledData] = useState<Output | undefined>(undefined);

    // When a new configuration comes get fresh data
    const onControlsChange = useCallback((N: number, S: number, P: number, reset: boolean) => {
        const workerInput: Input = {
            N,
            S,
            P,
            reset,
        };

        worker.current.postMessage(workerInput);
    }, []);

    // Handle worker
    useEffect(() => {
        const workerCurrent: Worker = worker.current;

        // Init worker with current data
        worker.current.postMessage({
            init: inputData,
        });

        // Init render
        worker.current.postMessage({
            N: CONFIG.INITIAL_N,
            S: CONFIG.INITIAL_S,
            P: CONFIG.INITIAL_P,
            reset: true,
        });

        // Listen to messages
        workerCurrent.onmessage = function (e) {
            setSampledData(e.data);
        }

        // Cleanup
        return () => {
            workerCurrent.terminate();
        }
    }, [inputData]);

    return <>
        <Controls dataLength={inputData[0].length} onChange={onControlsChange}></Controls>
        {sampledData && <Aggregates data={sampledData.aggregates}></Aggregates>}
        {sampledData && <Plot data={sampledData.data}></Plot>}
    </>
}