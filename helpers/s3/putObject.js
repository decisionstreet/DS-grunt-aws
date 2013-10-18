var aws = require('aws-sdk'),
    _ = require('underscore'),
    grunt = require('grunt'),
    fs = require('fs');

module.exports = function (config, options, done) {

    var stream = fs.createReadStream(config.file);

    (new aws.S3()).putObject({
        Bucket: config.bucket,
        Key: config.key,
        Body: stream
    }, function (err) {
        if (err) {
            throw new Error(err);
        }

        grunt.log.writeln('uploaded [' + config.file + '] to');
        grunt.log.writeln('   bucket: ' + config.bucket);
        grunt.log.writeln('   key: ' + config.key);

        done();
    });
};
