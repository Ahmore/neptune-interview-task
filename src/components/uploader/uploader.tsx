import type {ChangeEvent, RefObject} from "react";

export function Uploader({ worker, onLoad}: { worker: RefObject<Worker> }) {
    const loaderHandler = function (event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();

            reader.addEventListener("load", function (e) {
                const data: string = e.target?.result as string;

                worker.current.postMessage({
                    type: "INIT",
                    data: data,
                });


                // const parsedData: InputData = [
                //     [],
                //     []
                // ];
                // const lines = data?.split("\n").filter(d => d !== "");
                //
                // for (let i = 0; i < lines.length; i++) {
                //     const [x, y]: [number, number] = lines[i].split(",").map(Number) as [number, number];
                //     parsedData[0].push(x);
                //     parsedData[1].push(y);
                // }


            });

            reader.readAsBinaryString(file);

            // worker.current.onmessage((e) => {
            //     const workerOutput: WorkerOutput = e.data;
            //
            //     if (workerOutput.type === "INIT") {
            //         onLoad(workerOutput.data.length);
            //     }
            // })
        }
    }
    return <input type="file" onChange={loaderHandler} id="dealCsv"/>;
}