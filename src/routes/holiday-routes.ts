import { t } from "elysia";
import { CreateHolidayDTO, ResponseHolidayDTO, UpdateHolidayDTO } from "../models/holiday.dtos";
import holidayService from "../service/holiday.service";
import { CollectionError, CollectionErrorCodes } from "../errors/errors";
import { Elysia } from "elysia";
import { isValidDate } from "../utils/date-validator";

export default class HolidayRoutesRegistrator {
    public static registerRoutes(app: Elysia): void {

        app.group("/holidays", app => {
            return app
                .get("/", async () => await holidayService.getHolidays(),
                    {
                        response: t.Array(ResponseHolidayDTO),
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
                            200: ResponseHolidayDTO
                        },
                        params: t.Object({
                            id: t.Numeric()
                        }),
                        detail: {
                            tags: ['Holidays']
                        }

                    })
                .post("/", async ({ body, set }) => {
                    const holiday = await holidayService.addHoliday(body);
                    set.status = 201;
                    return holiday;
                },
                    {
                        body: CreateHolidayDTO,
                        response: {
                            404: t.Object({ message: t.String() }),
                            201: ResponseHolidayDTO
                        },
                        detail: {
                            tags: ['Holidays']
                        },
                        beforeHandle: ({ body, set }) => {
                            if (body.startDate && !isValidDate(body.startDate)) {
                                set.status = 400;
                                return { message: "Invalid start date" };
                            }
                        }
                    })
                .put("/", async ({ body, set }) => {
                    const holiday = await holidayService.updateHoliday(body);
                    return holiday;
                }, {
                    body: UpdateHolidayDTO,
                    response: {
                        404: t.Object({ message: t.String() }),
                        200: ResponseHolidayDTO
                    },
                    beforeHandle: ({ body, set }) => {
                        if (body.startDate && !isValidDate(body.startDate)) {
                            set.status = 400;
                            return { message: "Invalid start date" };
                        }
                    },
                    detail: {
                        tags: ['Holidays']
                    }
                })
                .delete("/:id", async ({ params, set }) => {
                    try {
                        await holidayService.deleteHolidayById(params.id);
                        return { succeeded: true };
                    } catch (e: any) {
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

                        }),
                        detail: {
                            tags: ['Holidays']
                        }
                    })
        });

    }
}