var type = require('../../types');

exports.type = type.action2;
exports.subtype = 0x03;
exports.subtypeLength = 4;
exports.fields = type.struct({
    direction: type.float,
    unknown02: type.int32, // 0 ??
    unknown03: type.int32, // 0 ??
    unknown04: type.int32 // 0 ??
});