var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x12;
exports.subtypeLength = 4;
exports.fields = type.struct({
    id: type.int32 // todo: make "1" be false
});