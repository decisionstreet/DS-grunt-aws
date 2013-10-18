var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt'),
    s3putObject = require('../s3/putObject');

module.exports = function (config, options, done) {

    var s3Key = (options.beanstalk.versionKeyPrefix || '') + config.versionKey;

    // first, upload to s3
    var s3config = {
        bucket: options.beanstalk.versionBucket,
        key: s3Key,
        file: config.file
    };
    s3putObject(s3config, options, function () {
        // next, create the version in beanstalk + link to the s3 item
        (new aws.ElasticBeanstalk()).createApplicationVersion({
            ApplicationName: options.beanstalk.applicationName,
            VersionLabel: config.versionName,
            Description: config.versionDescription,
            SourceBundle: {
                S3Bucket: options.beanstalk.versionBucket,
                S3Key: s3Key
            }
        }, function (err, data) {
            if (err) { throw new Error(err); }

            grunt.log.writeln('Created application version for [' + data.ApplicationVersion.ApplicationName + ']');
            grunt.log.writeln('   version name: ' + data.ApplicationVersion.VersionLabel);
            grunt.log.writeln('   version description: ' + data.ApplicationVersion.Description);

            done();
        });

    });

};
