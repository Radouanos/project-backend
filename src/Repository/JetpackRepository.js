module.exports = class {
    constructor(db) {
        this.db = db;
    }

    create(jetpack) {
        if (!jetpack) {
            return'Jetpack object is undefined';
        }

        if (!jetpack.id || !jetpack.name) {
            return 'Jetpack object is missing information';
        }

        this.db
            .get('jetpacks')
            .push(jetpack.toJson())
            .write()
    }
    getAll() {
        return this.db.get('jetpacks').value();
    }
    get(id) {
        return this.db.get('jetpacks').find({id: id}).value();
    }
    getSize() {

        return this.db.get('jetpacks').size().value();
    }
    getAvailable(startDate, endDate, bookRepo) {
        if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
            return 'Invalid date format';
        } else {
            var allElements = [];
            var elems = this.getAll();

            //var maxelms = this.getSize() - 1; -> this.getSize() - 1
            var idJet = "";
            var booking1;
            // for (var i = 0; i <= maxelms; i++) {
            for (var i = 0; i < Object.keys(elems).length; i++) {

                idJet = elems[i].id;
                if (bookRepo.get(idJet) === undefined) {
                    allElements.push(elems[i]);
                } else {
                    booking1 = bookRepo.get(idJet);
                    if (booking1.startDate > endDate || booking1.endDate < startDate) {
                        allElements.push(elems[i]);
                    }
                }


            }
            return allElements;

        }
    }
};