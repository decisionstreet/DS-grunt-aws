var aws = require('aws-sdk');

module.exports = function (grunt) {

    grunt.registerMultiTask('aws', 'Performs a number of Amazon Web Service functions', function () {
        var done = this.async();

        if (this.data.action === undefined) {
            throw new Error('AWS targets must have an "action" defined')
        } else if (this.data.service === undefined) {
            throw new Error('AWS targets must have "service" defined');
        }

        aws.config.update(this.options().access);

        var fn;
        try {
            fn = require('../helpers/' + this.data.service + '/' + this.data.action);
        } catch (e) {
            throw new Error('Unknown AWS action');
        }

        fn(this.data, this.options(), done);
    });

};