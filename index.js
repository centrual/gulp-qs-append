const through = require('through2');
const PluginError = require('plugin-error');
const QsAppend = require('./lib/qsAppend');

module.exports = function() {
    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-qs-append', 'Streams not supported!'));
        } else if (file.isBuffer()) {
            const qsAppend = new QsAppend(file);
            file.contents = qsAppend.getAppendedFileContentsAsBuffer(encoding);
            return callback(null, file);
        }

        return callback(null, file);
    });
};
