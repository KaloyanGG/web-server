import { HolidayRoutesRegistrator } from "./holiday-routes";
import { LocationRoutesRegistrator } from "./location-routes";
import { ElysiaConstructorReturnType, IRegistrator } from "./regisrator.inteface";

export class RoutesRegistrator {

    static registerRoutes(app: ElysiaConstructorReturnType) {

        app
            .get("/", (context) => {
                return "App is running!";
            });


        //todo: ask Techo if leave with "new" or use "static"
        new HolidayRoutesRegistrator().registerRoutes(app);
        new LocationRoutesRegistrator().registerRoutes(app);
    }

}
