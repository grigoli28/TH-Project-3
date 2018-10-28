const Router = require('express').Router;
const Car = require('../models/Car');

const { PersonDB, CarDB } = require('../database/PersonCarDatabase.js');

const router = Router();



router.get('/', (req, res) => {
    if (req.query.search == 'true') {
        carSearch(req, res);
    }
    res.render('car/index', { title: "Available Cars", cars: CarDB });
});


router.get('/new', (req, res) => {
    res.render('car/add', { title: "Add New Car", persons: PersonDB });
});


router.post('/new', (req, res) => {
    const ID = req.body.ownerID;
    const person = PersonDB.find(p => p.ID == ID);

    const car = new Car(
        req.body.manufacturer,
        req.body.model,
        req.body.year,
        req.body.color,
        req.body.VIN,
        req.body.licenseNumber,
        person
    );
    person.car = car;

    CarDB.push(car);

    res.render('car/add', { title: "Cars Page", persons: PersonDB });
});


router.get('/:VIN', (req, res) => {
    const VIN = req.params.VIN;
    const car = CarDB.find(car => car.VIN == VIN);
    if (!car)
        res.redirect('/cars');
    res.render('car/detail', { title: "Person Details", car, persons: PersonDB });
});


router.patch('/:VIN', (req, res) => {
    const VIN = req.params.VIN;
    const car = CarDB.find(c => c.VIN == VIN);
    car.disabled = req.body.disabled;
    res.sendStatus(200);
});


router.put('/:VIN', (req, res) => {
    const VIN = req.params.VIN;
    const ID = req.body.ownerID;
    const car = CarDB.find(c => c.VIN == VIN);
    const person = PersonDB.find(p => p.ID == ID);

    if (car.owner) {
        car.owner.car = null;
    }

    person.car = car;

    car.update(
        req.body.manufacturer,
        req.body.model,
        req.body.year,
        req.body.color,
        req.body.VIN,
        req.body.licenseNumber,
        person
    );

    res.sendStatus(200);
});


router.delete('/:VIN', (req, res) => {
    const VIN = req.params.VIN;
    const car = CarDB.find(c => c.VIN ==VIN);
    const index = CarDB.indexOf(car);

    // remove from current owner
    car.owner.car = null;

    CarDB.splice(index, 1);
    res.sendStatus(200);
});


function carSearch(req, res) {
    const vinRegex = /^\s*([0-9a-z]{17})\s*$/i;
    const modelRegex = /^([a-z]+)\s+((?:[0-9a-z-]+\s*)+)$/i;
    if (vinRegex.test(req.query.filter)) {
        const VIN = vinRegex.exec(req.query.filter)[1];
        const car = CarDB.find(c => c.VIN.toUpperCase() == VIN.toUpperCase());
        res.render('car/index', { title: "Available Cars", cars: [car] });
    }
    if (modelRegex.test(req.query.filter)) {
        const carDetails = modelRegex.exec(req.query.filter);
        const manuf = carDetails[1];
        const model = carDetails[2];
        const car = CarDB.find(c => c.manufacturer.toUpperCase() == manuf.toUpperCase() &&
            c.model.toUpperCase() == model.toUpperCase());
        res.render('car/index', { title: "Available Cars", cars: [car] });
    }
}


module.exports = router;