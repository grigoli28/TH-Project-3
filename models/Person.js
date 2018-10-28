module.exports = class Person {
    constructor(first, mid = "", last, id, bdate, car = null, disabled = false) {
        this.firstName = first;
        this.middleName = mid;
        this.lastName = last;
        this.ID = id;
        this.birthDate = bdate;
        this.disabled = disabled;
        this.car = car;
    }

    update(first, mid, last, id, bdate, car) {
        this.firstName = first;
        this.middleName = mid;
        this.lastName = last;
        this.ID = id;
        this.birthDate = bdate;
        this.car = car;
    }
}