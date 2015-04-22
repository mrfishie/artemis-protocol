// Starts scanning an entity given the ID - apparently doesn't need to target it first?!
var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x13;
exports.subtypeLength = 4;
exports.fields = type.struct({
    id: type.int32
});