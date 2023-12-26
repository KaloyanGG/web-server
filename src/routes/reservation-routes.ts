import Elysia, { t } from "elysia";
import reservationService from "../service/reservation.service";
import { CreateReservationDTO, ResponseReservationDTO, UpdateReservationDTO } from "../models/reservation.dtos";
import logger from "../utils/logger";
import { CollectionError, CollectionErrorCodes } from "../errors/errors";

export default class ReservationRoutesRegistrator {
    public static registerRoutes(app: Elysia): void {
        app.group("/reservations", app => {

            return app
                .get("/", async () => await reservationService.getReservations(),
                    {
                        response: t.Array(ResponseReservationDTO),
                        detail: {
                            tags: ['Reservations']
                        }
                    })
                .get("/:id", async ({ params, set }) => {
                    const reservation = await reservationService.getReservationById(params.id);
                    return reservation;
                }, {
                    params: t.Object({
                        id: t.Numeric()
                    }),
                    response: {
                        404: t.Object({ message: t.String() }),
                        200: ResponseReservationDTO
                    },
                    detail: {
                        tags: ['Reservations']
                    },
                })
                .post("/", async ({ body, set }) => {
                    try {
                        const reservation = await reservationService.addReservation(body);
                        set.status = 201;
                        return reservation;
                    } catch (e: any) {
                        if (e instanceof CollectionError) {
                            set.status = 404;
                        }
                        return { message: e.message };
                    }
                },
                    {
                        body: CreateReservationDTO,
                        response: {
                            404: t.Object({ message: t.String() }),
                            201: ResponseReservationDTO
                        },
                        detail: {
                            tags: ['Reservations']
                        },
                    })
                .put("/", async ({ body, set }) => {
                    try {
                        const holiday = await reservationService.updateReservation(body);
                        return holiday;
                    } catch (e: any) {
                        set.status = 400;
                        if (e instanceof CollectionError && e.getCode() === CollectionErrorCodes.VALUE_NOT_FOUND) {
                            set.status = 404;
                            // e.message = "Reservation not found.";
                        }
                        return { message: e.message };
                    }
                }, {
                    body: UpdateReservationDTO,
                    response: {
                        404: t.Object({ message: t.String() }),
                        200: ResponseReservationDTO
                    },
                    detail: {
                        tags: ['Reservations']
                    },
                })
                .delete("/:id", async ({ params, set }) => {
                    try {
                        await reservationService.deleteReservationById(params.id)
                        return { succeeded: true }
                    } catch (e: any) {
                        set.status = 400;
                        return {
                            message: e.message,
                            succeeded: false
                        }
                    }

                },
                    {
                        params: t.Object({
                            id: t.Numeric()
                        }),
                        response: {
                            404: t.Object({ message: t.String(), succeeded: t.Boolean() }),
                            200: t.Object({ succeeded: t.Boolean() })
                        },
                        detail: {
                            tags: ['Reservations']
                        },
                    })
        })
    }
}