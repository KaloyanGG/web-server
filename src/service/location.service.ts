import Database from "../database/database";

class LocationService {
    private static instance: LocationService;

    private constructor() { }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new LocationService();
        }

        return this.instance;
    }

    public getLocations() {
        return Database.getLocations();
    }

    public async getLocationById(id: Number): Promise<Location> {
        return await Database.getLocationById(id);
    }

    public async addLocation(location: CreateLocationType): Promise<Location> {
        return await Database.addLocation(location);
    }

    public async updateLocation(location: UpdateLocationType): Promise<Location> {
        return await Database.updateLocation(location);
    }

    public async deleteLocationById(id: Number) {
        await Database.deleteById(id, 'locations');
    }
}

export default LocationService.getInstance();