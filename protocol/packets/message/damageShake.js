var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x05;
exports.subtypeLength = 4;
exports.fields = type.struct({
    unknown01:  type.int32,
    duration:   type.float
});