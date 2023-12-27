import { Elysia } from "elysia"
import HolidayRoutesRegistrator from "../routes/holiday-routes";
import LocationRoutesRegistrator from "../routes/location-routes";
import ReservationRoutesRegistrator from "../routes/reservation-routes";
const registerRoutesPlugin = new Elysia();

registerRoutesPlugin
    .get("/", (context) => {
        return "App is running!";
    });

LocationRoutesRegistrator.registerRoutes(registerRoutesPlugin);
HolidayRoutesRegistrator.registerRoutes(registerRoutesPlugin);
ReservationRoutesRegistrator.registerRoutes(registerRoutesPlugin);

export default registerRoutesPlugin;


