import type {WorkerInput, WorkerOutput} from "../model/worker-api.model.ts";
import { DataBuffer } from "./data-buffer.ts";

let dataBuffer: DataBuffer;

self.onmessage = function (e) {
    const message: WorkerInput = e.data;

    switch (message.type) {
        case "INIT":
            dataBuffer = new DataBuffer(message.data);

            self.postMessage({
                type: "INIT",
                data: dataBuffer.getParsedDataSize(),
            } as WorkerOutput)

            break;
        case "RENDER":
            // If config was changed reset cache
            if (message.data.reset) {
                dataBuffer.resetCache();
            }

            // Removed previous cache values to keep it as small as possible
            dataBuffer.keepClean(message.data.N, message.data.S, message.data.P);

            self.postMessage({
                type: "RENDER",
                data: dataBuffer.getData(message.data.N, message.data.S),
            } as WorkerOutput);

            // Counts values forward to speed up
            dataBuffer.fillBuffer(message.data.N, message.data.S, message.data.P, 5);

            break;
        default:
            return assertExhaustive(message, "Unknown message type");
    }
}

export function assertExhaustive(
    value: never,
    message: string = "Reached unexpected case in exhaustive switch"
): never {
    throw new Error(message);
}