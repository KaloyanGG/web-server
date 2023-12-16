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

    private db: MyDatabaseContent = {
        locations: [],
        holidays: [],
        reservations: [],
    };

    private constructor() { }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async init() {
        this.db = await Bun
            .file(Bun.env.DATABASE_FILE_NAME || 'database.json')
            .json<MyDatabaseContent>();
    }

    public addLocation(location: Location) {
        JSONFileEditor.addToJSONCollection('locations', location, Bun.env.DATABASE_FILE_NAME || 'database.json', true);
    }

    public getFileContent() {
        return this.db;
    }

    public getLocations() {
        return this.db.locations;
    }

    public getHolidays() {
        return this.db.holidays;
    }

    public getReservations() {
        return this.db.reservations;
    }

}

export default Database.getInstance();