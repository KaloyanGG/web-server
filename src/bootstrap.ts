import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import { signaleConfig } from './config/signale.config';
import { Signale } from 'signale';
import { swConfig } from './config/swagger.config';

export default class Bootstrap {

    public static start() {
        const signale = new Signale(signaleConfig);
        signale.info('Starting application...');

        const app = Bootstrap.initializeElysiaApplication();
    
        app.listen(Bun.env.PORT || 3000);
    }

    private static initializeElysiaApplication() {
        const app
            = new Elysia()
                .use(swagger(swConfig))
                .get("/", () => "Hello Elysia", {
                    detail: {
                        tags: ["User"]
                    }
                })
                .onError((err) => {
                    console.log(err)
                    if (err.code === 'NOT_FOUND') return 'Route not found :('

                })
                .get('/id/:id', ({ params: { id } }) => id);

        return app;
    }
}