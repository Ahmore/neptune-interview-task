import type {InputData} from "../../model/input.model.ts";
import {Controls} from "../controls/controls.tsx";
import type {Output} from "../../model/output.model.ts";
import {useCallback, useState} from "react";

export function GraphContainer({inputData}: { inputData: InputData }) {
    const [data, setData] = useState<Output>({});
    const [started, setStarted] = useState(false);

    const onControlsChange = (N: number, S: number, T: number, P: number) => {
        console.log("NEW CONFIGURATION", N, S, T, P);
    }
    const startStop = () => setStarted(started => !started);


    return <>
        <Controls onChange={ useCallback(onControlsChange, []) }></Controls>
    </>
}