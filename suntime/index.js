const VERSION = require('./package').version;

exports.VERSION = VERSION;

/** Find the time relative to the suns location
 * @param {Float} latitude  //latitude in Decimal degrees
 * @param {Float} longitude //longitude in Decimal degrees
 *
 */
var gettime = function (latitude, longitude) {
    return Date.now(); //TODO replace this when function is ready
}

exports.gettime = gettime;