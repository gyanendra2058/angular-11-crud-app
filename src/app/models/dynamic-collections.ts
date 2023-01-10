export class DynamicCollections {
    private _collection = new Map<string, string>();

    constructor(keys: Map<string, string>) {
        this._collection = keys;
    }
    public getValue(key: string): string {
        return this._collection.get(key) || key;
    }
}