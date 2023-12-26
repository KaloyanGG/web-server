
export enum CollectionErrorCodes{
    COLLECTION_NOT_FOUND,
    COLLECTION_IS_EMPTY,
    KEY_NOT_FOUND,
    VALUE_NOT_FOUND,
}

export class CollectionError extends Error {

    private code: CollectionErrorCodes;

    constructor(message: string, code: CollectionErrorCodes) {
        super(message);
        this.name = "CollectionError";
        this.code = code;

        Error.captureStackTrace(this, this.constructor)
    }

    public getCode(): CollectionErrorCodes {
        return this.code;
    }
}