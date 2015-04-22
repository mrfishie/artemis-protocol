// Used to pick the consoles to use on the current ship
var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x0e;
exports.subtypeLength = 4;
exports.fields = type.struct({
    console:    type.enums.console,
    selected:   type.int32
});