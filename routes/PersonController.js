const Router = require('express').Router;
const Person = require('../models/Person');

const { PersonDB, CarDB } = require('../database/PersonCarDatabase.js');

const router = Router();



router.get('/', (req, res) => {
    if (req.query.search == 'true') {
        personSearch(req, res);
    }
    res.render('person/index', { title: "Available Persons", persons: PersonDB });
});


router.get('/new', (req, res) => {
    res.render('person/add', { title: "Add New Person", cars: CarDB });
});


router.post('/new', (req, res) => {
    const VIN = req.body.ownedCarVIN;
    const car = CarDB.find(c => c.VIN == VIN) || null;
    const person = new Person(
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.id,
        req.body.birthDate,
        car
    );
    if (car) {
        car.owner = person;
    }
    PersonDB.push(person);
    res.render('person/add', { title: "Add New Person", cars: CarDB });
});


router.get('/:ID', (req, res) => {
    const ID = req.params.ID;
    const person = PersonDB.find(p => p.ID == ID);
    if (!person)
        res.redirect('/persons');
    res.render('person/detail', { title: "Person Details", person, cars: CarDB });
});


router.patch('/:ID', (req, res) => {
    const ID = req.params.ID;
    const person = PersonDB.find(p => p.ID == ID);
    person.disabled = req.body.disabled;
    res.sendStatus(200);
});


router.put('/:ID', (req, res) => {
    const ID = req.params.ID;
    const VIN = req.body.ownedCarVIN;
    const person = PersonDB.find(p => p.ID == ID);
    const car = CarDB.find(c => c.VIN == VIN);

    // set previous car as available
    if (person.car) {
        person.car.owner = null;
    }

    // set person as owner of current car
    car.owner = person;

    person.update(
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.id,
        req.body.birthDate,
        car
    );
    res.sendStatus(200);
});


router.delete('/:ID', (req, res) => {
    const ID = req.params.ID;
    const person = PersonDB.find(p => p.ID == ID);
    const index = PersonDB.indexOf(person);

    // remove current person as car owner
    person.car.owner = null;
    PersonDB.splice(index, 1);
    
    res.sendStatus(200);
});


function personSearch(req, res) {
    const idRegex = /^[0-9]{11}$/;
    const nameRegex = /^\s*([a-z-]+)\s+([a-z-]+)\s*$/i;
    if (idRegex.test(req.query.filter)) {
        const ID = idRegex.exec(req.query.filter)[0];
        const person = PersonDB.find(p => p.ID == ID);
        res.render('person/index', { title: "Available Persons", persons: [person] });
    }
    if (nameRegex.test(req.query.filter)) {
        const fullName = nameRegex.exec(req.query.filter);
        const fName = fullName[1];
        const lName = fullName[2];
        const person = PersonDB.find(p => p.firstName == fName && p.lastName == lName);
        res.render('person/index', { title: "Available Persons", persons: [person] });
    }
}


module.exports = router;