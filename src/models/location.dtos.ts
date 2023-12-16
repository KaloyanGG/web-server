import { t } from "elysia";

export const createLocationDTO = t.Object({
    street: t.Optional(t.String()),
    number: t.Optional(t.String()),
    city: t.Optional(t.String()),
    country: t.Optional(t.String()),
    imageUrl: t.Optional(t.String()),
});

export const responseLocationDTO = t.Object({
    id: t.Optional(t.BigInt()),
    street: t.Optional(t.String()),
    number: t.Optional(t.String()),
    city: t.Optional(t.String()),
    country: t.Optional(t.String()),
    imageUrl: t.Optional(t.String()),
});

export const updateLocationDTO = t.Object({
    id: t.Optional(t.BigInt()),
    street: t.Optional(t.String()),
    number: t.Optional(t.String()),
    city: t.Optional(t.String()),
    country: t.Optional(t.String()),
    imageUrl: t.Optional(t.String()),
});


