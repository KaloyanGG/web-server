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

    // public addLocation(location: createLocationDTO){

    // }
}

export default LocationService.getInstance();