const VERSION = require('./package').version;
const suncalc = require('suncalc');

exports.VERSION = VERSION;

const findDateMidpoint = (start, end) => {
    const difference = end.getTime() - start.getTime();
    const midpointTime = start.getTime() + difference / 2;
    const midpointDate = new Date(midpointTime);
    return midpointDate;
};

const getSunrise = (latitude, longitude, date) => {
    const observer_height = 1.8;
    var result = suncalc.getTimes(date, latitude, longitude, observer_height);
    return result.sunrise;
}

const getSunset = (latitude, longitude, date) => {
    const observer_height = 1.8;
    var result = suncalc.getTimes(date, latitude, longitude, observer_height);
    return result.sunset;
}

/** Find the time relative to the suns location
 * @param {Float} latitude  //latitude in Decimal degrees
 * @param {Float} longitude //longitude in Decimal degrees
 *
 */
var gettime = (latitude, longitude, date = new Date()) => {
    const sunrise = getSunrise(latitude, longitude, date);
    const sunset = getSunset(latitude, longitude, date);
    var tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrow_sunrise = getSunrise(latitude, longitude, tomorrow);
    var yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday_sunset = getSunset(latitude, longitude, yesterday);

    const secs_in_24h = 24 * 60 * 60;
    const secs_in_12h = 12 * 60 * 60;
    const t_in_12h = secs_in_12h * 1000;
    var d_length = sunset.getTime() - sunrise.getTime();
    var d_length_s = d_length / 1000;
    var d_length_h = d_length_s / 60 / 60;
    var dsec = secs_in_12h / d_length_s ;
    var yn_length = sunrise.getTime() - yesterday_sunset.getTime();
    var yn_length_s = yn_length / 1000;
    var yn_length_h = yn_length_s / 60 / 60;
    var tn_length = tomorrow_sunrise.getTime() - sunset.getTime();
    var tn_length_s = tn_length / 1000;
    var tn_length_h = tn_length_s / 60 / 60;
    var ynsec = secs_in_12h / yn_length_s;
    var tnsec = secs_in_12h / tn_length_s;
    var sundial_y18 = yesterday_sunset;
    var sundial_0 = findDateMidpoint(yesterday_sunset, sunrise);
    var sundial_6 = sunrise;
    var sundial_12 = findDateMidpoint(sunrise, sunset);
    var sundial_18 = sunset;
    var sundial_24 = findDateMidpoint(sunset, tomorrow_sunrise);
    var sundial_t6 = tomorrow_sunrise;

    var now = date;
    var now_time = now.getTime();
    if ((now_time >= sundial_6.getTime()) && (now_time <= sundial_18.getTime())){
        // day time
        var time_percentage = ((now_time - sundial_6.getTime()) / d_length);
        var start_time = new Date();
        start_time.setHours(6,0,0,0);
    } else if ((now_time > sundial_18.getTime()) && (now_time < sundial_24.getTime())) {
        // tonight time
        var time_percentage = ((now_time - sundial_18.getTime()) / tn_length);
        var start_time = new Date();
        start_time.setHours(18,0,0,0);
    } else  { // ((now_time > sundial_y18.getTime()) && (now_time < sundial_6.getTime())) {
        // yesterday night time
        var time_percentage = ((now_time - sundial_y18.getTime()) / (sundial_6.getTime() - sundial_y18.getTime()));
        var start_time = yesterday;
        start_time.setHours(18,0,0,0);
    }

    var change_time = t_in_12h * time_percentage;
    var new_time = new Date();
    new_time.setTime(start_time.getTime() + change_time);

    return_obj = {
        sundial_time: new_time,
        day_length: d_length,
        night_length: tn_length
    };
    
    return return_obj;
}

exports.gettime = gettime;