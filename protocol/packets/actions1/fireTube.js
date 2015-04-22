// Fire a torpedo tube
var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x08;
exports.subtypeLength = 4;
exports.fields = type.struct({
    tube: type.int32 // from 0 to 5, depending on the ship being piloted
});