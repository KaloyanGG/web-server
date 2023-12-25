import { t } from "elysia";
import { CreateHolidayDTO, responseHolidayDTO, updateHolidayDTO } from "../models/holiday.dtos";
import holidayService from "../service/holiday.service";
import { CollectionError, CollectionErrorCodes } from "../errors/errors";
import { Elysia } from "elysia";

export default class HolidayRoutesRegistrator {
    public static registerRoutes(app: Elysia): void {

        app.group("/holidays", app => {
            return app
                .get("/", async () => await holidayService.getHolidays(),
                    {
                        response: t.Array(responseHolidayDTO),
                        detail: {
                            tags: ['Holidays']
                        }
                    })
                .get("/:id", async ({ params, set }) => {
                    const holidayOrUndefined = await holidayService.getHolidayById(params.id)
                    if (!holidayOrUndefined) {
                        set.status = 404;
                        return { message: "Holiday not found." };
                    }
                    return holidayOrUndefined;
                }
                    , {
                        response: {
                            404: t.Object({ message: t.String() }),
                            200: responseHolidayDTO
                        },
                        params: t.Object({
                            id: t.Numeric()
                        }),
                        detail: {
                            tags: ['Holidays']
                        }

                    })
                .post("/", async ({ body, set }) => {
                    try {
                        const holiday = await holidayService.addHoliday(body);
                        set.status = 201;
                        return holiday;
                    } catch (e) {
                        if (e instanceof CollectionError) {
                            set.status = 404;
                        }
                        return { message: e.message };
                    }
                },
                    {
                        body: CreateHolidayDTO,
                        response: {
                            404: t.Object({ message: t.String() }),
                            201: responseHolidayDTO
                        },
                        detail: {
                            tags: ['Holidays']
                        }
                    })
                .put("/", async ({ body, set }) => {

                    try {
                        const holiday = await holidayService.updateHoliday(body);
                        return holiday;
                    } catch (e) {
                        set.status = 400;
                        return { message: e.message };
                    }

                }, {
                    body: updateHolidayDTO,
                    response: {
                        404: t.Object({ message: t.String() }),
                        200: responseHolidayDTO
                    }
                })
                .delete("/:id", async ({ params, set }) => {
                    try {
                        await holidayService.deleteHolidayById(params.id);
                        return { succeeded: true };
                    } catch (e) {
                        set.status = 400;
                        return {
                            succeeded: false,
                            message: e.message
                        };
                    }
                },
                    {
                        params: t.Object({
                            id: t.Numeric()
                        }),
                        response: t.Object({
                            succeeded: t.Boolean(),
                            message: t.Optional(t.String())

                        })
                    })
        });

    }
}