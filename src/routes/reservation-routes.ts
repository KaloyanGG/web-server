import Elysia, { t } from "elysia";
import reservationService from "../service/reservation.service";
import { CreateReservationDTO, ResponseReservationDTO, UpdateReservationDTO } from "../models/reservation.dtos";

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
                    return await reservationService.getReservationById(params.id);
                }, {
                    params: t.Object({
                        id: t.Numeric()
                    }),
                    response: {
                        200: ResponseReservationDTO
                    },
                    detail: {
                        tags: ['Reservations']
                    },
                })
                .post("/", async ({ body, set }) => {
                    const reservation = await reservationService.addReservation(body);
                    set.status = 201;
                    return reservation;
                },
                    {
                        body: CreateReservationDTO,
                        response: {
                            201: ResponseReservationDTO
                        },
                        detail: {
                            tags: ['Reservations']
                        },
                    })
                .put("/", async ({ body, set }) => {
                    return await reservationService.updateReservation(body);
                }, {
                    body: UpdateReservationDTO,
                    response: {
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