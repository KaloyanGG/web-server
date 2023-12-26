import { t } from "elysia";
import { ResponseHolidayDTO } from "./holiday.dtos";

export const CreateReservationDTO = t.Object({
    contactName: t.Optional(t.String()),
    phoneNumber: t.Optional(t.String()),
    holiday: t.Optional(t.Integer()),
})

export const ResponseReservationDTO = t.Object({
    id: t.Integer(),
    contactName: t.Optional(t.String()),
    phoneNumber: t.Optional(t.String()),
    holiday: t.Optional(ResponseHolidayDTO),
})

export const UpdateReservationDTO = t.Object({
    id: t.Integer(),
    contactName: t.Optional(t.String()),
    phoneNumber: t.Optional(t.String()),
    holiday: t.Optional(t.Integer()),
})