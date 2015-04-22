var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x03;
exports.subtypeLength = 4;
exports.fields = type.struct({
    filename: type.string
});