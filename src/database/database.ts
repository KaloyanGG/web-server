import { config } from './../config/environment';
import JSONFileEditor from "../utils/json-editor";

class Database {

    private static instance: Database;

    private constructor() { }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }


    public async addLocation(location: CreateLocationType): Promise<Location> {
        const addedId = await JSONFileEditor.addToJSONCollection('locations', location, config.DATABASE_FILE_NAME);
        const addedLocation = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', addedId, config.DATABASE_FILE_NAME);
        return addedLocation;
    }

    public async addHoliday(holiday: CreateHolidayType): Promise<Holiday> {
        const holidayToAdd = { ...holiday, location: {} };

        const location = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', holiday.location, config.DATABASE_FILE_NAME);
        holidayToAdd.location = location;

        const addedId = await JSONFileEditor.addToJSONCollection('holidays', holidayToAdd, config.DATABASE_FILE_NAME);
        const addedHoliday = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', addedId, config.DATABASE_FILE_NAME);
        return addedHoliday;
    }

    public async addReservation(reservation: CreateReservationType): Promise<Reservation> {
        const reservationToAdd = { ...reservation, holiday: {} };
        if (reservation.holiday) {
            const holiday = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', reservation.holiday, config.DATABASE_FILE_NAME);
            reservationToAdd.holiday = holiday;
        }
        const addedId = await JSONFileEditor.addToJSONCollection('reservations', reservationToAdd, config.DATABASE_FILE_NAME);
        const addedReservation = await JSONFileEditor.getFromJSONCollectionBy<Reservation>('id', 'reservations', addedId, config.DATABASE_FILE_NAME);
        return addedReservation;
    }

    public async updateLocation(location: UpdateLocationType): Promise<Location> {
        const locationToUpdate = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', location.id, config.DATABASE_FILE_NAME);
        const newLocation = { ...locationToUpdate, ...location };
        await JSONFileEditor.deleteFromJSONCollectionBy('id', 'locations', location.id, config.DATABASE_FILE_NAME);
        await JSONFileEditor.addToJSONCollection('locations', newLocation, config.DATABASE_FILE_NAME);
        return newLocation;
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

    public async updateHoliday(holiday: UpdateHolidayType): Promise<Holiday> {
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

    public async updateReservation(reservation: UpdateReservationType) {
        const reservationToUpdate = await JSONFileEditor.getFromJSONCollectionBy<Reservation>('id', 'reservations', reservation.id, config.DATABASE_FILE_NAME);
        if (reservation.holiday) {
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
        const reservations = await JSONFileEditor.getAllFromJSONCollection<Reservation>('reservations', config.DATABASE_FILE_NAME);
        return reservations;
    }

    public async getReservationById(id: Number): Promise<Reservation> {
        const reservation = await JSONFileEditor.getFromJSONCollectionBy<Reservation>('id', 'reservations', id, config.DATABASE_FILE_NAME);
        return reservation;
    }

    public async getLocationById(id: Number): Promise<Location> {
        const location = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', id, config.DATABASE_FILE_NAME);
        return location;
    }

}

export default Database.getInstance();