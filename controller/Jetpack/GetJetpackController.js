const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');
const BookingRepository = require('../../src/Repository/BookingRepository');
module.exports = (req, res) => {
    var id = req.params.id;
    const repository = new JetpackRepository(db);
    const bookingRepo = new BookingRepository(db);
    if(req.param('start_date')===undefined && req.param('end_date')===undefined)
    {
        if (id === undefined)
        {
            res.status(200).send(repository.getAll());
        }
        else
            res.status(200).send(repository.get(id));
    }
    else
    {
        res.status(200).send(repository.getAvailable(req.param('start_date'),req.param('end_date'),bookingRepo))
    }

};