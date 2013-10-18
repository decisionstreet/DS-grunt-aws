var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt');

module.exports = function (config, options, done) {
    (new aws.ElasticBeanstalk()).describeApplicationVersions({
        ApplicationName: options.beanstalk.applicationName
    }, function (err, data) {
        _.each(data.ApplicationVersions, function (info) {
            grunt.log.writeln(info.VersionLabel);
            grunt.log.writeln('   description: ' + info.Description);
            grunt.log.writeln('   created: ' + info.DateCreated);
            grunt.log.writeln('   uploaded: ' + info.DateUpdated);
            grunt.log.writeln('   S3 bucket: ' + info.SourceBundle.S3Bucket);
            grunt.log.writeln('   S3 key: ' + info.SourceBundle.S3Key);
            grunt.log.writeln();
        });

        done();
    });
};
