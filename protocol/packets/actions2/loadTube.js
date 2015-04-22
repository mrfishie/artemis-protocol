var type = require('../../types');

exports.type = type.action2;
exports.subtype = 0x02;
exports.subtypeLength = 4;
exports.fields = type.struct({
    tube: type.int32,               // from 0 to 5, depending on ship being piloted
    ordnance: type.enums.ordnance,
    unknown03: type.int32,          // 0 ??
    unknown04: type.int32           // 0 ??
});