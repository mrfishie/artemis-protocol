// A beam weapon has been fired. Beams are entities, so they have IDs
var type = require('../types');

exports.type = 0xb83fd2c4;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    id:         type.int32,
    mine:       type.int32,
    damage:     type.int32,
    beamPort:   type.int32, // usually 0 is starboard arc and 1 is portside arc, follows vesselData.xml
    unknown05:  type.int32, // observed 4
    unknown06:  type.int32, // observed 1 and 4
    sourceId:   type.int32,
    targetId:   type.int32,
    impactX:    type.float,
    impactY:    type.float,
    impactZ:    type.float,
    unknown12:  type.int8
});