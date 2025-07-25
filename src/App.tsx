import {useState} from 'react'
import './App.css'
import type {InputData} from "./model/input.model.ts";
import {Uploader} from "./components/uploader/uploader.tsx";
import {GraphContainer} from "./components/graph-container/graph-container.tsx";

function App() {
    const [inputData, setInputData] = useState<InputData>([]);

    const onLoad = (data: InputData) => {
        setInputData(data);
    }

    return <>
        {inputData.length === 0 && <Uploader onLoad={onLoad}/>}
        {inputData.length > 0 && <GraphContainer inputData={inputData}></GraphContainer>}
    </>;
}

export default App
