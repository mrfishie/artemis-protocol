// Sets the amount of coolant allocated for a ship system
var type = require('../../types');

exports.type = type.action2;
exports.subtype = 0x00;
exports.subtypeLength = 4;
exports.fields = type.struct({
    system: type.enums.system,
    amount: type.int32,     // from 0 to 8
    unknown03: type.int32,  // 0 ??
    unknown04: type.int32   // 0 ??
});