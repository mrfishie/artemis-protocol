// Tell a DAMCON team to go somewhere on the ship
var type = require('../../types');

exports.type = type.action2;
exports.subtype = 0x04;
exports.subtypeLength = 4;
exports.fields = type.struct({
    team: type.int32,
    x: type.int32,
    y: type.int32,
    z: type.int32
});