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
};