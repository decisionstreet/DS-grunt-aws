'use strict';

var accessConfig = require('./awsAccess.json');

module.exports = function(grunt) {

    // Project configuration.
    var config = {};

    config.jshint = {
        all: {
            files: {
                src: [
                    'Gruntfile.js',
                    'tasks/**/*.js',
                    'helpers/**/*.js'
                ]
            },
            options: {
                jshintrc: '.jshintrc'
            }
        }
    };

    config.eb = {
        blah: 'ok!'
    };

    config.aws = {
        options: {
            access: accessConfig,
            beanstalk: {
                applicationName: 'Drive'
            }
        },
        listEnvironments: {
            service: "elasticBeanstalk",
            action: "describeEnvironments"
        }
    };

    grunt.initConfig(config);

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);

};