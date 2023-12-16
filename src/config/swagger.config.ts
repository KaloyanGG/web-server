import { swagger } from '@elysiajs/swagger';

type SwaggerConfiguration = Parameters<typeof swagger>[0];

export const swConfig: SwaggerConfiguration = {
    path: "/docs",
    version: "3.1.0",
    documentation: {
        info:{
            title: "Web API",
            //todo: change
            description: "some desc",
            version: "3.1.0"
        },
        tags: [
            {
                name: "Locations",
                description: "Locations related endpoints"
            }
        ]
    },  
};