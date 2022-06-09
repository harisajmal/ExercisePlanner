const express = require('express');
const path = require('path');
const router = require('./routes/trainingRoutes');
const mustache = require('mustache-express')

const app = express();
const public = path.join(__dirname, 'public');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use(express.static(public));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');



app.use(function(req, res) {
    res.status(404);
    res.send('Oops! We didn\'t find what you are looking for.');
})
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})