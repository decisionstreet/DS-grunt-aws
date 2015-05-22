var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt'),
    Promise = require('bluebird');

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
    var environments;
    new Promise(function (resolve, reject) {
        (new aws.ElasticBeanstalk()).describeEnvironments({
            ApplicationName: options.beanstalk.applicationName
        }, function (err, data) {
            if (err) { return reject(err); }

            environments = data.Environments;

            resolve(environments);
        });
    }).map(function (env) {
        return new Promise(function (resolve, reject) {
            (new aws.ElasticBeanstalk()).describeEnvironmentResources({
                EnvironmentName: env.EnvironmentName
            }, function (err, data) {
                if (err) {
                    return reject(err);
                }

                (new aws.EC2()).describeInstances({
                    InstanceIds: _.pluck(data.EnvironmentResources.Instances, 'Id')
                }, function (err, data) {
                    if (err) {
                        return reject(err);
                    }

                    env._instances = data.Reservations;

                    resolve(env);
                });
            });
        });
    }).map(function (env) {
        grunt.log.writeln(env.EnvironmentName + ' [' + env.EnvironmentId + ']');
        grunt.log.writeln('  Status: ' + env.Status);
        grunt.log.writeln('  Health: ' + colorize(env.Health));
        grunt.log.writeln('  Version: ' + env.VersionLabel);
        grunt.log.writeln('  URL: ' + env.CNAME);

        grunt.log.writeln('  Instances:');
        _.each(env._instances, function (inst) {
            inst = inst.Instances[0];
            grunt.log.write('    ' + inst.InstanceId + ': ');
            grunt.log.write('[' + inst.State.Name + '] ');
            grunt.log.write(inst.PrivateIpAddress + ' ');
            if (inst.PublicIpAddress) {
                grunt.log.write('(pub: ' + inst.PublicIpAddress + ') ');
            }
            grunt.log.writeln();
        });

        grunt.log.writeln();
    }).nodeify(done);
};
