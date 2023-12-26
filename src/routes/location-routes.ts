import { Context, PreContext, t } from "elysia";
import { createLocationDTO, responseLocationDTO, updateLocationDTO } from "../models/location.dtos";
import locationService from "../service/location.service";

import { Elysia } from "elysia";
import { CollectionError, CollectionErrorCodes } from "../errors/errors";


export default class LocationRoutesRegistrator {
    public static registerRoutes(app: Elysia) {

        app.group("/locations", app => {

            app.get("/", async () => await locationService.getLocations(),
                {
                    response: t.Array(responseLocationDTO),
                    detail: {
                        tags: ['Locations']
                    }
                })
            app.get("/:id", async(ctx)=>{
                const locationOrUndefined = await locationService.getLocationById(ctx.params.id)
                if (!locationOrUndefined) {
                    ctx.set.status = 404;
                    // return { message: "Location not found." };
                    // throw new Error("Location not found.")
                    throw new CollectionError("Location not found", CollectionErrorCodes.VALUE_NOT_FOUND)
                }
                return locationOrUndefined;
            },
                {
                    response: {
                        404: t.Object({ message: t.String() }),
                        200: responseLocationDTO
                    },
                    params: t.Object({
                        id: t.Numeric()
                    }),
                    detail: {
                        tags: ['Locations']
                    }
                }),
                app.post("/", async ({ body, set }) => {
                    const location = await locationService.addLocation(body)
                    // if (!location) set.status = 400;
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
                )
            app.put("/", async ({ body, set }) => {
                const location = await locationService.updateLocation(body);
                if (!location) set.status = 404;
                return location;
            },
                {
                    body: updateLocationDTO,
                    response: {
                        404: t.Undefined(),
                        200: responseLocationDTO
                    },
                    detail: {
                        tags: ['Locations']
                    }
                })
            app.delete("/:id", async ({ params, set }) => {
                const isDeleted = await locationService.deleteLocationById(params.id)
                if (!isDeleted) set.status = 400;
                return isDeleted;
            }, {
                params: t.Object({
                    id: t.Numeric()
                }),
                detail: {
                    tags: ['Locations']
                }
            })
            return app;

        })

    };

}
