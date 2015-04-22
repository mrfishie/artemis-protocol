// A message is incoming from comms
var type = require('../types');

exports.type = 0xd672c35f;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    priority:   type.int32, // todo: enum?
    sender:     type.string,
    msg:        type.string
});