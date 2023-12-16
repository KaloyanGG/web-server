import Database from "../database/database";


class LocationService{
    private static instance: LocationService;

    private constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new LocationService();
        }
        
        return this.instance;
    }

    public getLocations(){
        return Database.getLocations();
    }

    public async addLocation(location: any){
        await Database.addLocation(location);
    }

    public async deleteLocationById(id: Number){
        await Database.deleteLocationById(id);
    }
}

export default LocationService.getInstance();