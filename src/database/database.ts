import JSONFileEditor from "../utils/json-editor";

type Location = {
    street: string,
    number: string,
    city: string,
    country: string,
    imageUrl: string,
}

type MyDatabaseContent = {
    locations: Location[],
    holidays: any[],
    reservations: any[],
}

class Database {

    private static instance: Database;

    private constructor() { }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async addLocation(location: Location) {
        JSONFileEditor.addToJSONCollection('locations', location, Bun.env.DATABASE_FILE_NAME || 'database.json', true);
    }

    public async deleteLocationById(id: Number) {
        //todo: fix the error handling
        JSONFileEditor.deleteFromJSONCollectionBy('id', 'locations', id, Bun.env.DATABASE_FILE_NAME || 'database.json');
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

    public getHolidays() {
        // return this.db.holidays;
    }

    public getReservations() {
        // return this.db.reservations;
    }

}

export default Database.getInstance();