import { swagger } from '@elysiajs/swagger';

type SwaggerConfiguration = Parameters<typeof swagger>[0];

export const swConfig: SwaggerConfiguration = {
    path: "/docs",
    version: "3.1.0",
    documentation: {
        info:{
            title: "Web API",
            description: "This is the documentation for the Web API of the ElysiaJS application.\n"+
            "Warning: The requests which require a body do not show the 'body' field.",
            version: "3.1.0",
        }
    },
};