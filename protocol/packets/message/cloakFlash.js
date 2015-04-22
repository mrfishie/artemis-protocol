// Enemy vessels using special abilities or jumping will trigger a flash, only shown in the main screen
var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x07;
exports.subtypeLength = 4;
exports.fields = type.struct({
    posX:   type.float,
    posY:   type.float,
    posZ:   type.float
});