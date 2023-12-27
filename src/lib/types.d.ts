type Prettify<T> = {
    [K in keyof T]: T[K]
} & {};

type ObjectWithId = {
    id: number
}

type Location = {
    street?: string,
    number?: string,
    city?: string,
    country?: string,
    imageUrl?: string,
} & ObjectWithId;

type Holiday ={
    location: Location,
    title?: string,
    startDate?: string,
    duration?: number,
    price?: number,
    freeSlots?: number,
} & ObjectWithId;

type Reservation = {
    contactName?: string,
    phoneNumber?: string,
    holiday: Holiday,
} & ObjectWithId;

type MyDatabaseContent = {
    locations: Location[],
    holidays: Holiday[],
    reservations: Reservation[],
}

type PartialTypeWithId<T extends { id: any }> = Required<Pick<T, 'id'>> & Partial<T>;

type CreateLocationType = Prettify<Omit<Location, 'id'> & { id?: number }>;
type CreateHolidayType = Prettify<Omit<Holiday, 'id' | 'location'> & { location: number }>;
type CreateReservationType = Prettify<Omit<Reservation, 'id' | 'holiday'> & { holiday?: number}>;

type UpdateLocationType = Prettify<Location>;
type UpdateHolidayType = Prettify<Omit<Holiday, 'location'> & { location?: number }>;
type UpdateReservationType = Prettify<Omit<Reservation, 'holiday'> & { holiday?: number }>;