// FIXME: why do we have gamePaused, gameUnpaused, AND togglePause?
var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x04;
exports.subtypeLength = 4;
exports.fields = type.struct({});