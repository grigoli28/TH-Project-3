const express = require('express');
const path = require('path');
const CarController = require('./routes/CarController');
const PersonController = require('./routes/PersonController');

const app = express();

const PORT = process.env.PORT || 3000;



app.set('views', './views');
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use('/cars', CarController);
app.use('/persons', PersonController);


app.get('/', (req, res) => {
    res.render('index', { title: "Welcome" });
});


app.listen(PORT, (req, res) => {
    console.log(`Server Started on - ${PORT}`);
});