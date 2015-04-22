var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x15;
exports.subtypeLength = 4;
exports.fields = type.struct({
    column: type.int8,
    stats:  type.boundArray(0xce, {
        unknown01:  type.int8,
        count:      type.int32,
        label:      type.string
    })
});