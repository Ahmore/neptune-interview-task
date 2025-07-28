import {Controls} from "../controls/controls.tsx";
import {type RefObject, useCallback, useEffect} from "react";
import type {Results} from "../../model/results.model.ts";
import {Aggregates} from "../aggregated/aggregates.tsx";
import {Plot} from "../plot/plot.tsx";
import {CONFIG} from "../../data/config.ts";
import type {WorkerInput} from "../../model/worker-api.model.ts";

import "./animated-plot.css";

export function AnimatedPlot({worker, dataLength, sampledData}: {
    worker: RefObject<Worker>,
    dataLength: number,
    sampledData: Results | undefined
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
    }, [worker]);

    return <div className="animated-plot">
        <div className="line">
            {!sampledData && <div className="placeholder"></div> }
            {sampledData && <Plot data={sampledData.data}></Plot>}
            <Controls dataLength={dataLength} onChange={onControlsChange}></Controls>
        </div>
        <div className="line">
            {!sampledData && <div className="placeholder2"></div> }
            {sampledData && <Aggregates data={sampledData.aggregates}></Aggregates>}
        </div>
    </div>
}