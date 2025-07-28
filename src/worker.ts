import type {WorkerApi} from "./model/worker-api.model.ts";
import { DataBuffer } from "./service/data-buffer.ts";

let dataBuffer: DataBuffer;

self.onmessage = function (e) {
    const data: WorkerApi = e.data;

    switch (data.type) {
        case "INIT":
            dataBuffer = new DataBuffer(data.data);

            break;
        case "RENDER":
            if (data.reset) {
                dataBuffer.resetCache();
            }

            self.postMessage(dataBuffer.getData(data.N, data.S));

            dataBuffer.fillBuffer(data.N, data.S, data.P, 2);

            break;
        default:
            return assertExhaustive(data, "Unknown message type");
    }
}

export function assertExhaustive(
    value: never,
    message: string = "Reached unexpected case in exhaustive switch"
): never {
    throw new Error(message);
}