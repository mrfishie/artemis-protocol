// Received at regular intervals, supposedly used for ping timeouts
var type = require('../types');

exports.type = 0xf5821226;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({});