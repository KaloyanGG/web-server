import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import { swConfig } from './config/swagger.config';
import logger from './utils/logger';
import { RoutesRegistrator } from './routes/registrator';
import { errorHandlerPlugin } from './plugins/errorHandler.plugin';
import Database from './database/database';

export default class Bootstrap {

    public static async start() {
        logger.info("Starting ElysiaJS application");

        await Database.init();

        const app
            = Bootstrap.initializeElysiaApplication();

        // app.guard(
        //         {
        //             body: t.Object({
        //                 hi: t.String()
        //             }),

        //         },
        //         (app) =>
        //             app
        //                 .post('/lifecycleExplanation', (context) => {
        //                     logger.info("...Handling...");
        //                 }, {
        //                     parse() {
        //                         logger.info("...Parsing...");
        //                     },
        //                     transform() {
        //                         logger.info("...Transforming...");
        //                     },
        //                     beforeHandle() {
        //                         logger.info("...Before Handle...");
        //                     },
        //                     afterHandle() {
        //                         logger.info("...After Handle...");
        //                     },
        //                     error() {
        //                         logger.info("...Error...");
        //                     },
        //                     onResponse() {
        //                         logger.info("...Response...");
        //                     },
        //                 }))

        app.listen(Bun.env.PORT || 3000);
    }

    private static initializeElysiaApplication() {
        const app = new Elysia();

        app
            .use(errorHandlerPlugin)
            .use(swagger(swConfig));

        RoutesRegistrator.registerRoutes(app);

        return app;
    }
}