const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const sundialtime = require("sundialtime");

const app = express();
const port = process.env.PORT || 8080;

VIEWS_DIR = path.join(__dirname, '/public/views/');
CSS_DIR = path.join(__dirname, '/public/css/');
JS_DIR = path.join(__dirname, '/public/js/');

//Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/css', express.static(CSS_DIR));
app.use('/js', express.static(JS_DIR));

app.get('/', function(req, res) {
    res.sendFile(path.join(VIEWS_DIR, 'index.html'));
});

app.get('/api', function (req, res) {
    res.sendFile(path.join(VIEWS_DIR, '/api.html'));
});

app.get('/api/version', function (req, res) {
    res.send(sundialtime.VERSION)
});

app.post('/api/gettime', function (req, res) {
    let lat = parseFloat(req.body.lat);
    let long = parseFloat(req.body.long);
    if (req.body.date) {
        var date = new Date(parseFloat(req.body.date));
    } else {
        var date = new Date();
    }
    var ret = sundialtime.gettime(lat, long, date);
    var resp_data = {
        sundial_time: ret.sundial_time,
        day_length: ret.day_length,
        night_length: ret.night_length
    }
    res.json(resp_data);
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.sendFile(path.join(VIEWS_DIR, '404.html'), 404);
});

app.listen(port, function () {
    console.log(`Website listening on port ${port}!`)
});