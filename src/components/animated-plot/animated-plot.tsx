import {Controls} from "../controls/controls.tsx";
import {type RefObject, useCallback, useEffect} from "react";
import type {Output} from "../../model/output.model.ts";
import {Aggregates} from "../aggregated/aggregates.tsx";
import {Plot} from "../plot/plot.tsx";
import {CONFIG} from "../../data/config.ts";
import type {WorkerInput} from "../../model/worker-api.model.ts";

export function AnimatedPlot({worker, dataLength, sampledData}: {
    worker: RefObject<Worker>,
    dataLength: number,
    sampledData: Output
}) {
    // When a new configuration comes get fresh data
    const onControlsChange = useCallback((N: number, S: number, P: number, reset: boolean) => {
        const workerInput: WorkerInput = {
            type: "RENDER",
            data: {
                N,
                S,
                P,
                reset,
            }
        };

        worker.current.postMessage(workerInput);
    }, [worker]);

    // Handle worker
    useEffect(() => {
        // const workerCurrent: Worker = worker.current;

        // Init worker with current data
        // worker.current.postMessage({
        //     init: inputData,
        // });

        // Init render
        worker.current.postMessage({
            type: "RENDER",
            data: {
                N: CONFIG.INITIAL_N,
                S: CONFIG.INITIAL_S,
                P: CONFIG.INITIAL_P,
                reset: true,
            }
        });

        // // Listen to messages
        // workerCurrent.onmessage = function (e) {
        //     setSampledData(e.data);
        // }
        //
        // // Cleanup
        // return () => {
        //     workerCurrent.terminate();
        // }
    }, []);

    return <>
        <Controls dataLength={dataLength} onChange={onControlsChange}></Controls>
        {sampledData && <Aggregates data={sampledData.aggregates}></Aggregates>}
        {sampledData && <Plot data={sampledData.data}></Plot>}
    </>
}