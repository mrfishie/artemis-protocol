// DMX messages are only received in main screens of ships other than the first one
var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x10;
exports.subtypeLength = 4;
exports.fields = type.struct({
    name:       type.string,
    enabled:    type.int32
});