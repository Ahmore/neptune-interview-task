export class BigArray {
    public static CHUNK_SIZE = 50 * 1000 * 1000;
    private _bigArray: number[][] = [
        [],
        []
    ];

    constructor(data) {
        if (data) {
            this._bigArray = data;
        }
    }

    public push(element: number) {
        // if (this._bigArray[this._chunks].length === BigArray.CHUNK_SIZE) {
        //     this._chunks++;
        //     this._bigArray.push([]);
        // }

        // console.log(this._bigArray);

        if (this._bigArray[0].length === BigArray.CHUNK_SIZE) {
            this._bigArray[1].push(element);
        } else {
            this._bigArray[0].push(element);
        }

        // this._bigArray[this._chunks].push(element);
    }

    public get(index: number) {
        const size = this._bigArray[0].length;

        if (index < size) {
            return this._bigArray[0][index];
        } else {
            return this._bigArray[1][index - size];
        }
        // const chunkIndex = Math.floor(index / BigArray.CHUNK_SIZE);
        // const chunkOffset = index % BigArray.CHUNK_SIZE;
        //
        // return this._bigArray[chunkIndex][chunkOffset];
    }

    public slice(start: number, end: number) {
        // const bigArray = new BigArray();
        //
        // for (let i = start; i < end; i++) {
        //     bigArray.push(this.get(i));
        // }

        const len =  this._bigArray[0].length;

        if (start < len) {
            return new BigArray([
                this._bigArray[0].slice(start, end),
                [],
            ]);
        }

        // return new BigArray([
        //     this._bigArray[0].slice(start, this._bigArray[0].length),
        //     this._bigArray[1].slice(0, this._bigArray[1].length - start),
        // ]);
    }

    public get length() {
        return this._bigArray[0].length + this._bigArray[1].length;
    }

    // public get chunks() {
    //     return this._chunks;
    // }

    public flat() {
        const length = this.length;
        const result: number[] = [];

        for (let i = 0; i < length; i++) {
            result.push(this.get(i));
        }

        // console.log("FLAAT", result);

        return result;
    }
}