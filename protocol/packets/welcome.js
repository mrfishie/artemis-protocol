var type = require('../types');

exports.type = 0x6d04b3da;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    msg: type.asciiString
});