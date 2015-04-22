var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x09;
exports.subtypeLength = 4;
exports.fields = type.struct({
    id: type.int32
});