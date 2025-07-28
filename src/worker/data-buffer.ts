import {getData} from "./data-sampler.ts";
import type {Results} from "../model/results.model.ts";
import type {ParsedData} from "../model/parsed-data.model.ts";

export class DataBuffer {
    private _chunks: [number, number][][] = [];
    private _parsedData!: ParsedData;
    private _cache: Map<string, Results> = new Map();

    public upload(data: [number, number][]) {
        this._chunks.push(data);
    }

    public init() {
        const size = this._chunks.reduce((a, b) => a + b.length, 0);
        const parsedData: ParsedData = [new Float32Array(size), new Float32Array(size)];
        let offset = 0;

        this._chunks.forEach(chunk => {
            chunk.forEach(point => {
                parsedData[0][offset] = point[0];
                parsedData[1][offset] = point[1];
                offset++;
            })
        })

        this._parsedData = parsedData;
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

    public getSize(): number {
        return this._parsedData[0].length;
    }
}