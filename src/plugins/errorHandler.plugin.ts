import Elysia from "elysia";

export const errorHandlerPlugin
    = new Elysia().onError((err) => {
        switch (err.code) {
            case 'NOT_FOUND':
                return 'Route not found :('
            case 'VALIDATION':
                return 'Validation error :('
            default:
                return err
        }
    })