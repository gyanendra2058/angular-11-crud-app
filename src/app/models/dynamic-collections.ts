export class DynamicCollections {
    private _collection = new Map<string, string>();

    constructor(keys: Map<string, string>) {
        this._collection = keys;
    }
    public getKey(key: string): string | undefined {
        return this._collection.get(key);
    }
}