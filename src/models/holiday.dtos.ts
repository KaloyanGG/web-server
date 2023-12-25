import { t } from "elysia";
import { responseLocationDTO } from "./location.dtos";

export const CreateHolidayDTO = t.Object({
    location: t.Optional(t.Integer()),
    title: t.Optional(t.String()),
    startDate: t.Optional(t.String()),
    duration: t.Optional(t.Integer()),
    price: t.Optional(t.Number()),
    freeSlots: t.Optional(t.Integer()),
});

export const responseHolidayDTO = t.Object({
    id: t.Integer(),
    location: responseLocationDTO,
    title: t.Optional(t.String()),
    startDate: t.Optional(t.String()),
    duration: t.Optional(t.Integer()),
    price: t.Optional(t.Number()),
    freeSlots: t.Optional(t.Integer()),
});

export const updateHolidayDTO = t.Object({
    id: t.Integer(),
    location: t.Optional(t.Integer()),
    title: t.Optional(t.String()),
    startDate: t.Optional(t.String()),
    duration: t.Optional(t.Integer()),
    price: t.Optional(t.Number()),
    freeSlots: t.Optional(t.Integer()),
});