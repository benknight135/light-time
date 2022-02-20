const suntime = require("suntime"); // import suntime
var assert = require('assert'); // assert used for testing

describe('suntime', function() {
    describe('version', function() {
        it('get version', function(done) {
            suntime.VERSION;
            done();
        });
    });
});