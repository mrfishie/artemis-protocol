var util = require('util');

function ParseError(message, buffer) {
    Error.call(this);
    Error.captureStackTrace(this, ParseError);

    this.name = 'ParseError';
    this.message = message + '\nBuffer data is:\n' + buffer.toString('hex');
    this.buffer = buffer;
}

util.inherits(ParseError, Error);

module.exports = ParseError;