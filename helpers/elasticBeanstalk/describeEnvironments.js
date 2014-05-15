var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt');

function colorize(colorName) {
    var code = {
        Red: 31,
        Green: 32,
        Yellow: 33,
        Grey: 37
    };
    return '\u001b[' + code[colorName] + 'm' + colorName + '\u001b[0m';
}

module.exports = function (config, options, done) {
    (new aws.ElasticBeanstalk()).describeEnvironments({
        ApplicationName: options.beanstalk.applicationName
    }, function (err, data) {

        _.each(data.Environments, function (env) {
            grunt.log.writeln(env.EnvironmentName + ' [' + env.EnvironmentId + ']');
            grunt.log.writeln('  Status: ' + env.Status);
            grunt.log.writeln('  Health: ' + colorize(env.Health));
            grunt.log.writeln('  Version: ' + env.VersionLabel);
            grunt.log.writeln('  URL: ' + env.CNAME);
            grunt.log.writeln();
        });

        done();
    });
};
