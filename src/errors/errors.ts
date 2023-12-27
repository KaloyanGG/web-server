export enum CollectionErrorCodes{
    COLLECTION_NOT_FOUND = "COLLECTION_NOT_FOUND",
    COLLECTION_IS_EMPTY = "COLLECTION_IS_EMPTY",
    KEY_NOT_FOUND = "KEY_NOT_FOUND",
    VALUE_NOT_FOUND = "VALUE_NOT_FOUND",
}

export class CollectionError extends Error {

    private code: CollectionErrorCodes;

    constructor(message: string, code: CollectionErrorCodes) {
        super(message);
        this.code = code;
        this.name = "CollectionError";
        Error.captureStackTrace(this, this.constructor)
    }

    public getCode(): CollectionErrorCodes {
        return this.code;
    }

}