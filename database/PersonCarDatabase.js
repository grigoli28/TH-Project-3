const Person = require('../models/Person');
const Car = require('../models/Car');


const CarDB = [
    new Car("BMW", "M8 Gran Coupe", "2019", "Dark Green", "4T1BF3EK7BU774594", "BM-080-MW", null),
    new Car("BMW", "M7 Gran Coupe", "2019", "Blue", "1XPFDE9X2MD311793", "BM-070-MW", null),
    new Car("BMW", "M5 Gran Coupe", "2019", "Teal", "5FRYD4H46FB029811", "BM-050-MW", null),
    new Car("AUDI", "Q8", "2019", "Black", "4H465FRYDFB029811", "AU-008-DI", null),
    // new Car("AUDI", "Q7", "2019", "Red", "98115FRYD4H46FB02", "AU-007-DI", null),
    // new Car("Mercedes", "AMG S55", "2019", "Yellow", "546FB02FRYD4H9811", "ME-055-RC", null)
];


const PersonDB = [
    new Person("Jano", "", "Bokuchava", 10123265154, "2018-12-12", null),
    new Person("Otar", "", "Tsilosani", 63264213142, "2018-12-12", null),
    new Person("Roi", "", "Yehoshua", 13244135263, "2018-12-12", null),
    new Person("Jane", "Smith", "Doe", 26163324142, "2018-12-12", null),
    // new Person("John", "Doe", "Shepherd", 24110135263, "2018-12-12", null),
    // new Person("James", "Sam", "Smith", 13526313244, "2018-12-12", null)
];


for (let i = 0; i < 2; i++) {
    CarDB[i].owner = PersonDB[i];
    PersonDB[i].car = CarDB[i];
}


exports.CarDB = CarDB;
exports.PersonDB = PersonDB;