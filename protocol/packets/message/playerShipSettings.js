// Updates the settings for player ships
var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x0f;
exports.subtypeLength = 4;
exports.fields = type.staticSizeArray(8, {
    driveType:  type.enums.drive,
    shipType:   type.int32,
    unknown03:  type.int32,
    name:       type.string
});