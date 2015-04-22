// Messages sent from the server that will appear in the lower left corner of the main screen
var type = require('../../types');

exports.type = type.gameMessage;
exports.subtype = 0x0a;
exports.subtypeLength = 4;
exports.fields = type.struct({
    msg: type.string
});