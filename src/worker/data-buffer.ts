import {getData} from "./data-sampler.ts";
import type {Results} from "../model/results.model.ts";
import type {ParsedData} from "../model/parsed-data.model.ts";

export class DataBuffer {
    private _chunks: [Float32Array, Float32Array][] = [];
    private _parsedData!: ParsedData;
    private _cache: Map<string, Results> = new Map();

    public upload(data: [number, number][]) {
        const chunkX = new Float32Array(data.length);
        const chunkY = new Float32Array(data.length);

        for (let i = 0; i < data.length; i++) {
            chunkX[i] = data[i][0];
            chunkY[i] = data[i][1];
        }

        this._chunks.push([chunkX, chunkY]);
    }

    public init() {
        const size = this._chunks.reduce((a, b) => a + b[0].length, 0);
        const parsedData: ParsedData = [new Float32Array(size), new Float32Array(size)];
        let offset = 0;

        for (let i = 0; i < this._chunks.length; i++) {
            for (let j = 0; j < this._chunks[i][0].length; j++) {
                parsedData[0][offset] = this._chunks[i][0][j];
                parsedData[1][offset] = this._chunks[i][1][j];

                offset++;
            }
        }

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