const Booking = require("../../src/Entity/Booking");
const db = require('../../src/Db');
const BookingRepository = require('../../src/Repository/BookingRepository');

module.exports = (req, res) => {
    console.log(req.body);
    let booking = new Booking();
    booking.jetPackId = req.body.jetPackId;
    booking.startDate = req.body.startDate;
    booking.endDate = req.body.endDate;

    const repository = new BookingRepository(db);
    repository.create(booking);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(201).send(booking.toJson())
};