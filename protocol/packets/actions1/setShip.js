// Choose the ship that this client belongs to
var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x0d;
exports.subtypeLength = 4;
exports.fields = type.struct({
    ship: type.int32 // from 0 to 7, not 1 to 8
});