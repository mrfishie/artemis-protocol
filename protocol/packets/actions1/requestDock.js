var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x07;
exports.subtypeLength = 4;
exports.fields = type.struct({
    unknown01: type.int32 // 0 ??
});