const sundialtime = require('./index.js');

const now = new Date();
console.log("Input time: " + now);
var sundial_time = sundialtime.gettime(48.858512604080715, 2.294484228183192, now);
// var sundial_time = sundialtime.gettime(50.8377592, -0.1166351, now);
console.log("Sundial Time: " + sundial_time);