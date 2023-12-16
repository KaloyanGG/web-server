import { createLocationDTO } from "../models/location.dtos";
import locationService from "../service/location.service";
import { ElysiaConstructorReturnType, IRegistrator } from "./regisrator.inteface";

export class LocationRoutesRegistrator implements IRegistrator {
    public registerRoutes(app: ElysiaConstructorReturnType) {

        //todo: add controllers
        //todo: add guards

        app
            .group("/locations", app => {
                return app
                    .get("/", async () => await locationService.getLocations(),
                        {
                            detail: {
                                tags: ['Locations']
                            }
                        })
                    .get("/:id", (ctx) => {

                    },
                        {
                            detail: {
                                tags: ['Locations']
                            }
                        })
                    .post("/", async ({ body }) => await locationService.addLocation(body),
                        {
                            body: createLocationDTO,
                            detail: {
                                tags: ['Locations']
                            }
                        })
                    .put("/:id", (ctx) => {

                    },
                        {
                            detail: {
                                tags: ['Locations']
                            }
                        })
                    .delete("/:id", (ctx) => {

                    },
                        {
                            detail: {
                                tags: ['Locations']
                            }
                        })
            });

    }
}