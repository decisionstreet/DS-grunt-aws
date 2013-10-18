var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt');

module.exports = function (config, options, done) {

    (new aws.ElasticBeanstalk()).updateEnvironment({
        EnvironmentName: config.environmentName,
        VersionLabel: config.versionName
    }, function (err, data) {
        if (err) { throw new Error(err); }

        grunt.log.writeln(data.EnvironmentName + ' [' + data.EnvironmentId + ']');
        grunt.log.writeln('  Status: ' + data.Status);
        grunt.log.writeln('  Health: ' + data.Health);
        grunt.log.writeln('  Version: ' + data.VersionLabel);
        grunt.log.writeln('  URL: ' + data.CNAME);
        grunt.log.writeln();

        done();
    });

};

