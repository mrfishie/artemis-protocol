var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x11;
exports.subtypeLength = 4;
exports.fields = type.struct({
    capture: type.int8
});