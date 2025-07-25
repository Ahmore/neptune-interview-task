import type {ChangeEvent} from "react";
import type {InputData} from "../../model/input.model.ts";

export function Uploader({onLoad}: { onLoad: (data: InputData) => void }) {
    const loaderHandler = function (event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();

            reader.addEventListener("load", function (e) {
                const data: string = e.target?.result as string;
                const parsedData: InputData = [
                    [],
                    []
                ];
                const lines = data?.split("\n").filter(d => d !== "");

                for (let i = 0; i < lines.length; i++) {
                    const [x, y]: [number, number] = lines[i].split(",").map(Number) as [number, number];
                    parsedData[0].push(x);
                    parsedData[1].push(y);
                }

                onLoad(parsedData);
            });

            reader.readAsBinaryString(file);
        }
    }
    return <input type="file" onChange={loaderHandler} id="dealCsv"/>;
}