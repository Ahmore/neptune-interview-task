import type {Input} from "./model/input.model.ts";
import type {Output} from "./model/output.model.ts";
import {getData} from "./service/data-sampler.ts";

self.onmessage = function (e) {
    const input: Input = e.data;
    const t0 = performance.now();
    const output: Output = getData(input.data, input.N, input.S);
    const t1 = performance.now();

    // console.log("WORKER TIME", t1 - t0);

    self.postMessage(output);
}