import {type RefObject, useEffect, useRef, useState} from 'react'
import './App.css'
import {Uploader} from "./components/uploader/uploader.tsx";
import {AnimatedPlot} from "./components/animated-plot/animated-plot.tsx";
import workerUrl from "./worker/worker.ts?worker&url";
import type {WorkerOutput} from "./model/worker-api.model.ts";
import type {Results} from "./model/results.model.ts";

function App() {
    const worker: RefObject<Worker | null> = useRef(null);
    const [loadedDataLength, setLoadedDataLength] = useState(0);
    const [sampledData, setSampledData] = useState<Results>();

    // Cleanup
    useEffect(() => {
        worker.current = new Worker(workerUrl, {type: "module"});
        worker.current.onmessage = function (e) {
            const workerOutput: WorkerOutput = e.data;

            switch(workerOutput.type) {
                case "INIT":
                    setLoadedDataLength(workerOutput.data);
                    break;

                case "RENDER":
                    setSampledData(workerOutput.data);
                    break;
            }
        }

        return () => {
            worker.current?.terminate();
        }
    }, []);

    return <>
        <h1>Neptune interview task</h1>
        {loadedDataLength === 0 && <Uploader worker={worker} />}
        {loadedDataLength > 0 && <AnimatedPlot worker={worker} dataLength={loadedDataLength} sampledData={sampledData}></AnimatedPlot>}
    </>;
}

export default App
