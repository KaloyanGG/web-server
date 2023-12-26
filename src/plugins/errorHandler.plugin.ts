import Elysia from "elysia";
import logger from "../utils/logger";

export const errorHandlerPlugin
    = new Elysia().onError(({error}) => {
        logger.error(error);
        return error.message
    })