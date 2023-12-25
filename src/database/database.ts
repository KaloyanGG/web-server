import { responseLocationDTO } from './../models/location.dtos';
import JSONFileEditor from "../utils/json-editor";

export type Location = {
    id: number,
    street: string,
    number: string,
    city: string,
    country: string,
    imageUrl: string,
}

export type Holiday = {
    id: number,
    location: Location,
    title: string,
    startDate: string,
    duration: number,
    price: number,
    freeSlots: number,
}

type MyDatabaseContent = {
    locations: Location[],
    holidays: any[],
    reservations: any[],
}

export type PartialTypeWithId<T extends { id: any }> = Required<Pick<T, 'id'>> & Partial<T>;

export type updateHolidayWithOnlyLocationId = Omit<PartialTypeWithId<Holiday>, 'location'> & { location?: number };


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
        const addedId = await JSONFileEditor.addToJSONCollection('locations', location, Bun.env.DATABASE_FILE_NAME || 'database.json');
        const addedLocation = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', addedId, Bun.env.DATABASE_FILE_NAME || 'database.json');
        return addedLocation;
    }

    //repo - no try catch - only fetching the db
    public async addHoliday(holiday: Holiday): Promise<Holiday>{
        const location = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', holiday.location, Bun.env.DATABASE_FILE_NAME || 'database.json');
        holiday.location = location;
        const addedId = await JSONFileEditor.addToJSONCollection('holidays', holiday, Bun.env.DATABASE_FILE_NAME || 'database.json');
        const addedHoliday = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', addedId, Bun.env.DATABASE_FILE_NAME || 'database.json');
        return addedHoliday;
    }

    public async updateLocation(location: PartialTypeWithId<Location>): Promise<Location | undefined> {
        try {
            const locationToUpdate = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', location.id, Bun.env.DATABASE_FILE_NAME || 'database.json');
            const newLocation = { ...locationToUpdate, ...location };
            await JSONFileEditor.deleteFromJSONCollectionBy('id', 'locations', location.id, Bun.env.DATABASE_FILE_NAME || 'database.json');
            await JSONFileEditor.addToJSONCollection('locations', newLocation, Bun.env.DATABASE_FILE_NAME || 'database.json');
            return newLocation;
        } catch (e) {
            return undefined
        }

    }

    public async deleteById(id: Number, collection: string) {
        await JSONFileEditor.deleteFromJSONCollectionBy('id', collection, id, Bun.env.DATABASE_FILE_NAME || 'database.json');
    }

    public async getFileContent() {
        return await Bun
            .file(Bun.env.DATABASE_FILE_NAME || 'database.json')
            .json<MyDatabaseContent>();
    }

    public async getLocations() {
        return (await Bun
            .file(Bun.env.DATABASE_FILE_NAME || 'database.json')
            .json<MyDatabaseContent>()).locations;
    }

    public async getHolidays() {
        const result = (await Bun
            .file(Bun.env.DATABASE_FILE_NAME || 'database.json')
            .json<MyDatabaseContent>()).holidays;
        return result;
    }

    public async updateHoliday(holiday: updateHolidayWithOnlyLocationId): Promise<Holiday> {
        const holidayToUpdate = await JSONFileEditor.getFromJSONCollectionBy<Holiday>('id', 'holidays', holiday.id, Bun.env.DATABASE_FILE_NAME || 'database.json');        
        if(holiday.location && holiday.location !== holidayToUpdate.location.id){
            const location = await JSONFileEditor.getFromJSONCollectionBy<Location>('id', 'locations', holiday.location, Bun.env.DATABASE_FILE_NAME || 'database.json');
            holidayToUpdate.location = location;
        }
        const newHoliday = { ...holidayToUpdate, ...holiday };
        newHoliday.location = holidayToUpdate.location;
        await JSONFileEditor.deleteFromJSONCollectionBy('id', 'holidays', holiday.id, Bun.env.DATABASE_FILE_NAME || 'database.json');
        await JSONFileEditor.addToJSONCollection('holidays', newHoliday, Bun.env.DATABASE_FILE_NAME || 'database.json');
        return holidayToUpdate;
    }

    public async getReservations() {
        return (await Bun
            .file(Bun.env.DATABASE_FILE_NAME || 'database.json')
            .json<MyDatabaseContent>()).reservations;
    }

}

export default Database.getInstance();