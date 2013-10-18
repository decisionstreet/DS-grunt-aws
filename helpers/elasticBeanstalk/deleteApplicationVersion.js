var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt'),
    s3putObject = require('../s3/putObject');

module.exports = function (config, options, done) {

    (new aws.ElasticBeanstalk()).deleteApplicationVersion({
        ApplicationName: options.beanstalk.applicationName,
        VersionLabel: config.versionName,
        DeleteSourceBundle: config.deleteSource || false
    }, function (err) {
        if (err) { throw new Error(err); }

        grunt.log.writeln('Deleted application version for [' + options.beanstalk.applicationName + ']');
        grunt.log.writeln('   version name: ' + config.versionName);

        done();
    });

};

