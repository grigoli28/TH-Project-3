module.exports = class Car {
    constructor(manuf = "BMW", model = "M8 Grand Coupe", year = 2019, color = "Dark Green", VIN, licNum, owner = null, disabled = false) {
        this.manufacturer = manuf;
        this.model = model;
        this.year = year;
        this.color = color;
        this.VIN = VIN;
        this.licenseNumber = licNum;
        this.owner = owner;
        this.disabled = disabled;
    }

    update(manuf, model, year, color, VIN, licNum, owner) {
        this.manufacturer = manuf;
        this.model = model;
        this.year = year;
        this.color = color;
        this.VIN = VIN;
        this.licenseNumber = licNum;
        this.owner = owner;
    }
}