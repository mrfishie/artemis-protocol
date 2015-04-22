// Removes an object from play
var type = require('../types');

exports.type = 0xcc5a3e30;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    type: type.enums.object,
    id: type.int32
});