import {useEffect, useState} from 'react'
import './App.css'
import workerUrl from "./worker?worker&url";
import type {Input, InputData} from "./model/input.model.ts";
import {Uploader} from "./components/uploader/uploader.tsx";
import {GraphContainer} from "./components/graph-container/graph-container.tsx";

const worker = new Worker(workerUrl, {type: "module"})

function App() {
    const [inputData, setInputData] = useState<InputData>([]);

    // useEffect(() => {
    //     worker.onmessage = function (e) {
    //         console.log("WORKER OUTPUT", e.data);
    //     }
    //
    //     let i = 0;
    //     let interval;
    //
    //     interval = setInterval(() => {
    //         const workerInput: Input = {
    //             data: parsedData,
    //             N: 10000,
    //             S: i * 10000,
    //             P: 10,
    //             downsampleAt: 10 ^ 6,
    //         };
    //
    //         i++;
    //
    //         worker.postMessage(workerInput);
    //
    //         if (i >= 10) {
    //             clearInterval(interval);
    //         }
    //     }, 500)
    // }, []);

    const onLoad = (data: InputData) => {
        setInputData(data);
    }


    return <>
        { inputData.length === 0 && <Uploader onLoad={onLoad}/> }
        { inputData.length > 0 && <GraphContainer inputData={inputData}></GraphContainer> }
    </>;
}

export default App
