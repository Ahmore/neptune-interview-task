import { type ChangeEvent, type RefObject, useState } from "react";
import "./baller.css";
import Papa from "papaparse";

export function Uploader({ worker }: { worker: RefObject<Worker> }) {
    const [loading, setLoading] = useState(false);
    const [loadedPercentage, setLoadedPercentage] = useState("");
    const loaderHandler = function (event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files[0]) {
            const file = files[0];
            const fileSize = file.size;

            setLoading(true);

            Papa.parse(file, {
                dynamicTyping: true,
                skipEmptyLines: true,
                worker: true,
                chunk: function (results) {
                    setLoadedPercentage(
                        Math.min(
                            (results.meta.cursor / fileSize) * 100,
                            100,
                        ).toFixed(0),
                    );

                    worker.current.postMessage({
                        type: "UPLOAD",
                        data: {
                            data: results.data,
                        },
                    });
                },
                complete: function () {
                    worker.current.postMessage({
                        type: "INIT",
                    });
                },
            });
        }
    };
    return (
        <>
            {loading && (
                <div className="baller">
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                </div>
            )}
            {loadedPercentage !== "" && <div>{loadedPercentage}%</div>}
            {!loading && <input type="file" onChange={loaderHandler} />}
        </>
    );
}
