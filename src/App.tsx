import {useState} from 'react'
import './App.css'
import type {InputData} from "./model/input.model.ts";
import {Uploader} from "./components/uploader/uploader.tsx";
import {AnimatedPlot} from "./components/animated-plot/animated-plot.tsx";

function App() {
    const [inputData, setInputData] = useState<InputData>([]);

    const onLoad = (data: InputData) => {
        setInputData(data);
    }

    return <>
        {inputData.length === 0 && <Uploader onLoad={onLoad}/>}
        {inputData.length > 0 && <AnimatedPlot inputData={inputData}></AnimatedPlot>}
    </>;
}

export default App
