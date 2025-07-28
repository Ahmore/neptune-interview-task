import {type ChangeEvent, type RefObject, useState} from "react";
import "./baller.css"
import Papa from "papaparse";

export function Uploader({ worker, onLoad }: { worker: RefObject<Worker>, onLoad: (parsedDataSize: number) => void }) {
    const [loading, setLoading] = useState(false);
    const [loadedLines, setLoadedLines] = useState(0);
    const loaderHandler = function (event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files[0]) {
            const file = files[0];

            setLoading(true);
            
            let size = 0;
            let offset = 0;

            Papa.parse(file, {
                dynamicTyping: true,
                worker: true,
                chunk: function(results) {
                    size += results.data.length;

                    setLoadedLines(size);

                    worker.current.postMessage({
                        type: "INIT",
                        data: {
                            offset: offset,
                            data: results.data
                        },
                    });

                    offset += size;
                },
                complete: function() {
                    onLoad(size);
                }
            });
        }
    }
    return <>
        { loading && <div className="baller">
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
        </div> }
        { loadedLines > 0 && <div>Loaded lines: { loadedLines }</div>}
        { !loading && <input type="file" onChange={loaderHandler} /> }
    </>
}