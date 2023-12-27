import { t } from "elysia";
import { createLocationDTO, responseLocationDTO, updateLocationDTO } from "../models/location.dtos";
import locationService from "../service/location.service";
import { Elysia } from "elysia";

export default class LocationRoutesRegistrator {
    public static registerRoutes(app: Elysia) {

        app.group("/locations", app => {

            app.get("/", async () => await locationService.getLocations(),
                {
                    response: t.Array(responseLocationDTO),
                    detail: {
                        tags: ['Locations']
                    }
                });

            app.get("/:id", async (ctx) => {
                return await locationService.getLocationById(ctx.params.id);
            },
                {
                    response: {
                        200: responseLocationDTO
                    },
                    params: t.Object({
                        id: t.Numeric()
                    }),
                    detail: {
                        tags: ['Locations']
                    }
                });

            app.post("/", async ({ body, set }) => {
                const location = await locationService.addLocation(body)
                set.status = 201;
                return location;
            },
                {
                    body: createLocationDTO,
                    response: responseLocationDTO,
                    detail: {
                        tags: ['Locations']
                    }
                }
            );

            app.put("/", async ({ body, set }) => {
                return await locationService.updateLocation(body);
            },
                {
                    body: updateLocationDTO,
                    response: {
                        200: responseLocationDTO
                    },
                    detail: {
                        tags: ['Locations']
                    }
                });

            app.delete("/:id", async ({ params, set }) => {
                try {
                    await locationService.deleteLocationById(params.id)
                    return { succeeded: true }
                } catch (e: any) {
                    set.status = 400;
                    return {
                        message: e.message,
                        succeeded: false
                    }
                }
            }, {
                params: t.Object({
                    id: t.Numeric()
                }),
                response:{
                    404: t.Object({ message: t.String(), succeeded: t.Boolean() }),
                    200: t.Object({ succeeded: t.Boolean() })
                },
                detail: {
                    tags: ['Locations']
                }
            })

            return app;
        })

    };

}
