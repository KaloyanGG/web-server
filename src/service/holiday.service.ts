import Database from "../database/database";

class HolidayService {

    private static instance: HolidayService;

    private constructor() { }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new HolidayService();
        }

        return this.instance;
    }

    public getHolidays() {
        return Database.getHolidays();
    }

    public async getHolidayById(id: Number): Promise<Holiday | undefined> {
        return (await Database.getHolidays()).find(holiday => holiday.id === id);
    }

    public async addHoliday(holiday: CreateHolidayType): Promise<Holiday> {
        return await Database.addHoliday(holiday);
    }

    public async updateHoliday(holiday: UpdateHolidayType): Promise<Holiday> {
        return await Database.updateHoliday(holiday);
    }

    public async deleteHolidayById(id: Number) {
        await Database.deleteById(id, 'holidays');
    }
}


export default HolidayService.getInstance();
