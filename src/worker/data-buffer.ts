import {getData} from "./data-sampler.ts";
import type {Results} from "../model/results.model.ts";
import type {ParsedData} from "../model/parsed-data.model.ts";

export class DataBuffer {
    private _parsedData: ParsedData = [[], []];
    private _cache: Map<string, Results> = new Map();

    public init(offset: number, data: [number, number][]) {
        for (let i = 0; i < data.length; i++) {
            this._parsedData[0].push(data[i][0]);
            this._parsedData[1].push(data[i][1]);
            // this._parsedData[0][i + offset] = data[i][0];
            // this._parsedData[1][i + offset] = data[i][1];
        }
    }

    public keepClean(N: number, S: number, P: number) {
        if (this._cache.has(`${N}-${S - P}`)) {
            this._cache.delete(`${N}-${S - P}`);
        }
    }
    
    public getData(N: number, S: number) {
        if (this._cache.has(`${N}-${S}`)) {
            return this._cache.get(`${N}-${S}`);
        } else {
            const data = getData(this._parsedData, N, S);

            this._cache.set(`${N}-${S}`, data);
            
            return getData(this._parsedData, N, S);
        }
    }
    
    public fillBuffer(N: number, S: number, P: number, bufferSize: number) {
        for (let i = 1; i <= bufferSize; i++) {
            if (!this._cache.has(`${N}-${S + i*P}`)) {
                this._cache.set(`${N}-${S + i*P}`, getData(this._parsedData, N, S + i*P));
            }
        }
    }
    
    public resetCache() {
        this._cache.clear();
    }
}