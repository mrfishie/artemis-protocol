// Received when DAMCON teams move around and repair things, or when system nodes
// are damaged
var type = require('../types');

exports.type = 0x077e9f3c;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    nodes: type.boundArray(0xff, {
        x:      type.int8,
        y:      type.int8,
        z:      type.int8,
        damage: type.float
    }),
    teams: type.boundArray(0xfe, {
        teamId:     type.int8,
        goalX:      type.int32,
        goalY:      type.int32,
        goalZ:      type.int32,
        x:          type.int32,
        y:          type.int32,
        z:          type.int32,
        progress:   type.float,
        members:    type.int32
    })
});