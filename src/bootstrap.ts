import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import { swConfig } from './config/swagger.config';
import logger from './utils/logger';
import { errorHandlerPlugin } from './plugins/errorHandler.plugin';
import registerRoutesPlugin from './plugins/routes.plugin';
import config from './config/environment';

export default class Bootstrap {

    public static async start() {
        logger.info("Starting ElysiaJS application.");

        const app
            = Bootstrap.initializeElysiaApplication();

        app.listen(config.PORT);

        logger.info(`Application is listening on port ${config.PORT}.`);
    }

    private static initializeElysiaApplication() {
        const app = new Elysia();

        app
            .use(errorHandlerPlugin)
            .use(swagger(swConfig))
            .use(registerRoutesPlugin)

        return app;
    }
}