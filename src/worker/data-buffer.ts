import {getData} from "./data-sampler.ts";
import type {Results} from "../model/results.model.ts";
import type {ParsedData} from "../model/parsed-data.model.ts";

export class DataBuffer {
    private _parsedData: ParsedData;
    private _cache: Map<string, Results> = new Map();

    constructor(inputData: string) {
        const parsedData: ParsedData = [
            [],
            []
        ];
        const lines = inputData?.split("\n").filter(d => d !== "");

        for (let i = 0; i < lines.length; i++) {
            const [x, y]: [number, number] = lines[i].split(",").map(Number) as [number, number];
            parsedData[0].push(x);
            parsedData[1].push(y);
        }
        
        this._parsedData = parsedData;
    }

    public getParsedDataSize() {
        return this._parsedData[0].length;
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