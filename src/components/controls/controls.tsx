import {type RefObject, useEffect, useRef, useState} from "react";
import "./controls.css";
import {CONFIG} from "../../data/config.ts";

export function Controls({dataLength, onChange}: { dataLength: number, onChange: (N: number, S: number, P: number, reset: boolean) => void }) {
    const [N, setN] = useState(CONFIG.INITIAL_N);
    const [S, setS] = useState(CONFIG.INITIAL_S);
    const [T, setT] = useState(CONFIG.INITIAL_T);
    const [P, setP] = useState(CONFIG.INITIAL_P);
    const [started, setStarted] = useState(false);
    const intervalRef: RefObject<number | null> = useRef(null);

    // Cleanup
    useEffect(() => {
        // Init event
        onChange(N, S, P, true);

        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
        };
    }, []);

    function handleStart() {
        let i = 1;

        setStarted(true);

        intervalRef.current = setInterval(() => {
            const nextS = S + i*P;

            i++;

            if (nextS < dataLength) {
                onChange(N, nextS, P, false);

                setS(nextS);
            } else {
                setStarted(false);

                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }
        }, T);
    }

    function handleStop() {
        setStarted(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }

    return <div className="controls">
        <label>
            Size
            <input type="number" min="0" max={dataLength} value={N} onChange={(e) => {
                setN(+e.target.value);
                onChange(+e.target.value, S, P, true);
                setStarted(false);
            }} />
        </label>
        <label>
            Start
            <input type="number" min="0" max={dataLength} value={S} onChange={(e) => {
                setS(+e.target.value);
                onChange(N, +e.target.value, P, true);
                setStarted(false);
            }} />
        </label>
        <label>
            Step
            <input type="number" min="1" value={P} onChange={(e) => {
                setP(+e.target.value);
                setStarted(false);
            }} />
        </label>
        <label>
            Time delta
            <input type="number" min="16" value={T} onChange={(e) => {
                setT(+e.target.value);
                setStarted(false)
            }} />
        </label>
        <button className={ started ? "red" : "" } onClick={ () => {
            if (started) {
                handleStop();
            } else {
                handleStart()
            }
        } }>{ started ? "STOP" : "START" }</button>
    </div>;
}