const sundialtime = require("sundialtime"); // import sundialtime
var assert = require('assert'); // assert used for testing

describe('sundialtime', function() {
    describe('version', function() {
        it('get version', function(done) {
            sundialtime.VERSION;
            done();
        });
    });
});