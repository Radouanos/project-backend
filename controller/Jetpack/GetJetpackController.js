const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');
module.exports = (req, res) => {
    const repository = new JetpackRepository(db);
    var id = req.params.id;
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
    else {
        res.status(200).send(repository.getAvailable(req.param('start_date'), req.param('end_date'), bookingRepo));
    }
};