import type {WorkerInput, WorkerOutput} from "./model/worker-api.model.ts";
import { DataBuffer } from "./service/data-buffer.ts";

let dataBuffer: DataBuffer;

self.onmessage = function (e) {
    const message: WorkerInput = e.data;

    console.log("WORKER", e.data.type);

    switch (message.type) {
        case "INIT":
            dataBuffer = new DataBuffer(message.data);

            self.postMessage({
                type: "INIT",
                data: dataBuffer.getParsedDataSize(),
            } as WorkerOutput)

            break;
        case "RENDER":
            if (message.data.reset) {
                dataBuffer.resetCache();
            }

            self.postMessage({
                type: "RENDER",
                data: dataBuffer.getData(message.data.N, message.data.S),
            } as WorkerOutput)

            dataBuffer.fillBuffer(message.data.N, message.data.S, message.data.P, 2);

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