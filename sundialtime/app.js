const sundialtime = require('./index.js');

const now = new Date();
console.log("Input time: " + now);
var ret = sundialtime.gettime(48.858512604080715, 2.294484228183192, now);
console.log("Sundial Time: " + ret.sundial_time);