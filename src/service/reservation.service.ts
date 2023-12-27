
import Database from "../database/database";

class ReservationService {
    private static instance: ReservationService;

    constructor() { }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ReservationService();
        }
        return this.instance;
    }

    public getReservations() {
        return Database.getReservations();
    }

    public async getReservationById(id: Number): Promise<Reservation> {
        return await Database.getReservationById(id);
    }

    public async addReservation(reservation: CreateReservationType): Promise<Reservation> {
        return await Database.addReservation(reservation);
    }

    public async updateReservation(reservation: UpdateReservationType): Promise<Reservation> {
        return await Database.updateReservation(reservation);
    }

    public async deleteReservationById(id: Number){
        await Database.deleteById(id, 'reservations');
    }

}

export default ReservationService.getInstance();