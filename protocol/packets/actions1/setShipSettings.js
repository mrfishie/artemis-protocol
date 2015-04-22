// Sets the settings on a player ship
var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x16;
exports.subtypeLength = 4;
exports.fields = type.struct({
    driveType:  type.enums.drive,
    shipType:   type.int32,
    unknown03:  type.int32, // 1 ??
    shipName:   type.string
});