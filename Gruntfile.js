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
                applicationName: 'Drive',
                versionBucket: 'elasticbeanstalk-us-east-1-948269656986',
                versionKeyPrefix: ''
            }
        },
        listEnvironments: {
            service: "elasticBeanstalk",
            action: "describeEnvironments"
        },
        listVersions: {
            service: "elasticBeanstalk",
            action: "describeApplicationVersions"
        },
        uploadFile: {
            service: "s3",
            action: "putObject",
            bucket: 'elasticbeanstalk-us-east-1-948269656986',
            key: 'test',
            file: 'README.md'
        },
        createVersion: {
            service: "elasticBeanstalk",
            action: "createApplicationVersion",
            file: 'README.md',
            versionName: 'test-grunt-aws',
            versionDescription: '',
            versionKey: 'ima-testing-create-version'
        },
        deleteVersion: {
            service: "elasticBeanstalk",
            action: "deleteApplicationVersion",
            versionName: 'test-grunt-aws',
            deleteSource: true
        }
    };

    grunt.initConfig(config);

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);

};