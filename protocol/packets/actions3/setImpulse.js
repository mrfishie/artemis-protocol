var type = require('../../types');

exports.type = type.action3;
exports.subtype = 0x00;
exports.subtypeLength = 4;
exports.fields = type.struct({
    throttle: type.float
});