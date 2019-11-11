module.exports = class {
    constructor() {
        this._jetPackId = null;
        this._startDate = null;
        this._endDate = null;
    }


    get jetPackId() {
        return this._jetPackId;
    }

    set jetPackId(value) {
        this._jetPackId = value;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
    }

    toJson() {
        return {
            jetPackId : this.jetPackId,
            startDate: this.startDate,
            endDate: this.endDate
        }
    }
};