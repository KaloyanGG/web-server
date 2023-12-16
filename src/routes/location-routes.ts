import locationService from "../service/location.service";
import { ElysiaConstructorReturnType, IRegistrator } from "./regisrator.inteface";

export class LocationRoutesRegistrator implements IRegistrator {
    public registerRoutes(app: ElysiaConstructorReturnType) {

        //todo: add controllers
        //todo: add guards

        app
            .group("/locations", app => {
                return app
                    .get("/", () => locationService.getLocations())
                    .get("/:id", (ctx) => {

                    })
                    .post("/", (ctx) => {

                    })
                    .put("/:id", (ctx) => {

                    })
                    .delete("/:id", (ctx) => {

                    })
            });

    }
}