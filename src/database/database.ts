import { config } from './../config/environment';
import JSONFileEditor from "../utils/json-editor";

export type ObjectWithId = {
    id: number
}

export type Location = {
    street: string,
    number: string,
    city: string,
    country: string,
    imageUrl: string,
} & ObjectWithId;

export type Holiday = {
    location: Location,
    title: string,
    startDate: string,
    duration: number,
    price: number,
    freeSlots: number,
} & ObjectWithId;

export type Reservation = {
    contactName?: string,
    phoneNumber?: string,
    holiday?: Holiday,
} & ObjectWithId;

type MyDatabaseContent = {
    locations: Location[],
    holidays: any[],
    reservations: any[],
}

export type PartialTypeWithId<T extends { id: any }> = Required<Pick<T, 'id'>> & Partial<T>;

export type updateHolidayWithOnlyLocationId = Omit<PartialTypeWithId<Holiday>, 'location'> & { location?: number };
export type ReservationWithHolidayIdInsteadOfHoliday = Omit<Reservation, 'holiday'> & { holiday?: number };

// export type ReservationWithOnlyHolidayId = Omit<PartialTypeWithId<Reservation>, 'holiday'> & { holiday?: number };
export type UpdateReservationType = ReservationWithHolidayIdInsteadOfHoliday;
export type NewReservationType = Omit<Reservation, 'id' | 'holiday'> & { holiday?: number, id?: number };

class Database {

    private static instance: Database;

    private constructor() { }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    

    public async addLocation(location: Location): Promise<Location> {
        const addedId = await JSONFileEditor.addToJSONCollection('locations', location, config.DATABASE_FILE_NAME);
        const addedLocation = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', addedId, config.DATABASE_FILE_NAME);
        return addedLocation;
    }

    //repo - no try catch - only fetching the db
    public async addHoliday(holiday: Holiday): Promise<Holiday> {
        const location = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', holiday.location, config.DATABASE_FILE_NAME);
        holiday.location = location;
        const addedId = await JSONFileEditor.addToJSONCollection('holidays', holiday, config.DATABASE_FILE_NAME);
        const addedHoliday = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', addedId, config.DATABASE_FILE_NAME);
        return addedHoliday;
    }

    public async addReservation(reservation: NewReservationType): Promise<Reservation> {
        const reservationToAdd = { ...reservation } as Reservation;
        if (reservation.holiday) {
            const holiday = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', reservation.holiday, config.DATABASE_FILE_NAME);
            reservationToAdd.holiday = holiday;
        }
        const addedId = await JSONFileEditor.addToJSONCollection('reservations', reservationToAdd, config.DATABASE_FILE_NAME);
        const addedReservation = await JSONFileEditor.getFromJSONCollectionBy<Reservation>('id', 'reservations', addedId, config.DATABASE_FILE_NAME);
        return addedReservation;
    }

    public async updateLocation(location: PartialTypeWithId<Location>): Promise<Location | undefined> {
        try {
            const locationToUpdate = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', location.id, config.DATABASE_FILE_NAME);
            const newLocation = { ...locationToUpdate, ...location };
            await JSONFileEditor.deleteFromJSONCollectionBy('id', 'locations', location.id, config.DATABASE_FILE_NAME);
            await JSONFileEditor.addToJSONCollection('locations', newLocation, config.DATABASE_FILE_NAME);
            return newLocation;
        } catch (e) {
            return undefined
        }

    }

    public async deleteById(id: Number, collection: string) {
        await JSONFileEditor.deleteFromJSONCollectionBy('id', collection, id, config.DATABASE_FILE_NAME);
    }

    public async getFileContent() {
        return await Bun
            .file(config.DATABASE_FILE_NAME)
            .json<MyDatabaseContent>();
    }

    public async getLocations() {
        return (await Bun
            .file(config.DATABASE_FILE_NAME)
            .json<MyDatabaseContent>()).locations;
    }

    public async getHolidays() {
        const result = (await Bun
            .file(config.DATABASE_FILE_NAME)
            .json<MyDatabaseContent>()).holidays;
        return result;
    }

    public async updateHoliday(holiday: updateHolidayWithOnlyLocationId): Promise<Holiday> {
        const holidayToUpdate = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', holiday.id, config.DATABASE_FILE_NAME);
        if (holiday.location && holiday.location !== holidayToUpdate.location.id) {
            const location = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', holiday.location, config.DATABASE_FILE_NAME);
            holidayToUpdate.location = location;
        }
        const newHoliday = { ...holidayToUpdate, ...holiday };
        newHoliday.location = holidayToUpdate.location;
        await JSONFileEditor.deleteFromJSONCollectionBy('id', 'holidays', holiday.id, config.DATABASE_FILE_NAME);
        await JSONFileEditor.addToJSONCollection('holidays', newHoliday, config.DATABASE_FILE_NAME);
        return holidayToUpdate;
    }

    public async updateReservation(reservation: UpdateReservationType){
        const reservationToUpdate = await JSONFileEditor.getFromJSONCollectionBy<Reservation>('id', 'reservations', reservation.id, config.DATABASE_FILE_NAME);
        if(reservation.holiday){
            const holiday = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', reservation.holiday, config.DATABASE_FILE_NAME);
            reservationToUpdate.holiday = holiday;
        }
        const newReservation = { ...reservationToUpdate, ...reservation };
        newReservation.holiday = reservationToUpdate.holiday;
        await JSONFileEditor.deleteFromJSONCollectionBy('id', 'reservations', reservation.id, config.DATABASE_FILE_NAME);
        await JSONFileEditor.addToJSONCollection('reservations', newReservation, config.DATABASE_FILE_NAME);
        return reservationToUpdate;
    }

    public async getReservations(): Promise<Reservation[]> {
        // return (await Bun
        //     .file(config.DATABASE_FILE_NAME)
        //     .json<MyDatabaseContent>()).reservations;

        const reservations = await JSONFileEditor.getAllFromJSONCollection<Reservation>('reservations', config.DATABASE_FILE_NAME);
        return reservations;
    }

    public async getReservationById(id: Number): Promise<Reservation> {
        const reservation = await JSONFileEditor.getFromJSONCollectionBy<Reservation>('id', 'reservations', id, config.DATABASE_FILE_NAME);
        return reservation;
    }

}

export default Database.getInstance();