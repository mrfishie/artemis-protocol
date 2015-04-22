var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x02;
exports.subtypeLength = 4;
exports.fields = type.struct({
    id: type.int32 // todo: false if no target (value of "1")
});