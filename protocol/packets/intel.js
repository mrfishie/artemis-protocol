// Received when Science finishes a second scan, then at regular intervals
var type = require('../types');

exports.type = 0xee665279;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    id: type.int32,
    unknown02: type.int8,
    msg: type.string
});