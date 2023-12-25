import Database, { Location, PartialTypeWithId } from "../database/database";
import { responseLocationDTO } from "../models/location.dtos";


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

    public async getLocationById(id: Number): Promise<Location | undefined>{
        return (await Database.getLocations()).find(location => location.id === id);
    }

    public async addLocation(location: any): Promise<Location>{
        return await Database.addLocation(location);
    }

    public async updateLocation(location: PartialTypeWithId<Location>): Promise<Location | undefined>{
        return await Database.updateLocation(location);
    }

    public async deleteLocationById(id: Number){
        try{
            await Database.deleteById(id, 'locations');
            return true;
        }catch(e){
            return false
        }
    }
}

export default LocationService.getInstance();