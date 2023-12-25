import { Elysia } from "elysia"
import HolidayRoutesRegistrator from "./holiday-routes";
import LocationRoutesRegistrator from "./location-routes";
import ReservationRoutesRegistrator from "./reservation-routes";

export class RoutesRegistrator {
    static registerRoutes(app: Elysia) {
        app
            .get("/", (context) => {
                return "App is running!";
            });

        LocationRoutesRegistrator.registerRoutes(app);
        HolidayRoutesRegistrator.registerRoutes(app);
        ReservationRoutesRegistrator.registerRoutes(app);
    }

}
