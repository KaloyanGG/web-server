import Elysia from "elysia";
import logger from "../utils/logger";
import { CollectionError } from "../errors/errors";

export const errorHandlerPlugin
    = new Elysia().onError(({ error, set }) => {
        logger.error(error);

        switch(true){
            case error instanceof CollectionError:
                set.status = 404;
                break;
            default:
                set.status = 500;
        }

        return {
            message: error.message
        };
    })