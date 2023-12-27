import Elysia from "elysia";
import logger from "../utils/logger";
import { CollectionError } from "../errors/errors";

export const errorHandlerPlugin
    = new Elysia().onError(({ code, error, set }) => {

        switch (true) {
            case error instanceof CollectionError:
                set.status = 404;
                break;
            case code === "VALIDATION":
                set.status = 400;
                return { message: "Invalid data" }
            default:
                logger.error(error);
                set.status = 500;
        }

        return error.message;
    })