var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x14;
exports.subtypeLength = 4;
exports.fields = type.struct({
    title:  type.string,
    reason: type.string
});