var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x00;
exports.subtypeLength = 4;
exports.fields = type.struct({
    factor: type.int32 // from 0 to 4
});