import {type ChangeEvent, type RefObject, useState} from "react";
import './baller.css'

export function Uploader({ worker }: { worker: RefObject<Worker> }) {
    const [loading, setLoading] = useState(false);
    const loaderHandler = function (event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();

            setLoading(true);

            reader.addEventListener("load", function (e) {
                const data: string = e.target?.result as string;

                worker.current.postMessage({
                    type: "INIT",
                    data: data,
                });
            });

            reader.readAsBinaryString(file);
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
        { !loading && <input type="file" onChange={loaderHandler} /> }
    </>
}