const db = require('../../src/Db');
const JetpackRepository = require('../../src/Repository/JetpackRepository');
module.exports = (req, res) => {
    const repository = new JetpackRepository(db);
    var id = req.params.id;
    if (id === undefined)
    {
        res.status(200).send(repository.getAll());
    }
};