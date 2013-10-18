var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt');

module.exports = function (config, options, done) {
    (new aws.ElasticBeanstalk()).describeEnvironments({
        ApplicationName: options.beanstalk.applicationName
    }, function (err, data) {

        _.each(data.Environments, function (env) {
            grunt.log.writeln(env.EnvironmentName + ' [' + env.EnvironmentId + ']');
            grunt.log.writeln('  Status: ' + env.Status);
            grunt.log.writeln('  Health: ' + env.Health);
            grunt.log.writeln('  Version: ' + env.VersionLabel);
            grunt.log.writeln('  URL: ' + env.CNAME);
            grunt.log.writeln();
        });

        done();
    });
};
