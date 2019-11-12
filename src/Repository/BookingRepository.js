module.exports = class {
    constructor(db) {
        this.db = db;
    }

    create(booking)
    {
        if (!booking) {
            return  'booking object is undefined';
        }
        if (!booking.jetPackId || !booking.startDate ||!booking.endDate) {
            return  'booking object is missing information';
        }
        this.db
            .get('bookings')
            .push(booking.toJson())
            .write()
    }
    get(id)
    {
        return this.db.get('bookings').find({jetPackId:id}).value();
    }
};