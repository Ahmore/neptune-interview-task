import {useEffect, useRef, useState} from "react";
import "./controls.css";

export function Controls({dataLength, onChange}: { dataLength: number, onChange: (N: number, S: number, P: number, reset: boolean) => void }) {
    const [N, setN] = useState(5000);
    const [S, setS] = useState(0);
    const [T, setT] = useState(500);
    const [P, setP] = useState(10);
    const [started, setStarted] = useState(false);
    const intervalRef = useRef(0); // Interval
    const startStop = () => {
        setStarted(started => !started);
    }

    // Handle changing configuration values
    useEffect(() => {
        onChange(N, S, P, true);
        setStarted(false);
    }, [N, S, P, onChange]);

    useEffect(() => {
        if (started) {
            intervalRef.current = setInterval(() => {
                setS(s => s + P);
            }, T);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [started, P, T]);

    return <div className="controls">
        <label>
            Size
            <input type="number" min="0" max={dataLength} value={N} onChange={(e) => setN(+e.target.value)} />
        </label>
        <label>
            Start
            <input type="number" min="0" max={dataLength} value={S} onChange={(e) => setS(+e.target.value)} />
        </label>
        <label>
            Step
            <input type="number" min="1" value={P} onChange={(e) => setP(+e.target.value)} />
        </label>
        <label>
            Time delta
            <input type="number" min="16" value={T} onChange={(e) => { setT(+e.target.value); setStarted(false) }} />
        </label>
        <button onClick={ startStop }>{ started ? "STOP" : "START" }</button>
    </div>;
}