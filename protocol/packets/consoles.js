// Informs the client on which consoles are taken by players
var type = require('../types');

exports.type = 0x19c6e2d4;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    ship: type.int32,
    consoles: type.enumArray(type.enums.console, type.enums.consoleStatus)
});