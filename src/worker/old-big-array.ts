export class BigArray {
    public static CHUNK_SIZE = 10 * 1000 * 1000;
    private _bigArray: number[][] = [
        []
    ];
    private _chunks: number = 0;

    public push(element: number) {
        if (this._bigArray[this._chunks].length === BigArray.CHUNK_SIZE) {
            this._chunks++;
            this._bigArray.push([]);
        }

        this._bigArray[this._chunks].push(element);
    }

    public get(index: number) {
        const chunkIndex = Math.floor(index / BigArray.CHUNK_SIZE);
        const chunkOffset = index % BigArray.CHUNK_SIZE;

        return this._bigArray[chunkIndex][chunkOffset];
    }

    public slice(start: number, end: number) {
        const bigArray = new BigArray();

        for (let i = start; i < end; i++) {
            bigArray.push(this.get(i));
        }

        return bigArray;
    }

    public get length() {
        return this._bigArray.map(chunk => chunk.length).reduce((a, b) => a + b, 0);
    }

    public get chunks() {
        return this._chunks;
    }

    public flat() {
        const length = this.length;
        const result: number[] = [];

        for (let i = 0; i < length; i++) {
            result.push(this.get(i));
        }

        return result;
    }
}