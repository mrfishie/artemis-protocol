// Sets the damage control teams to autonomous or fully controlled
var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x0c;
exports.subtypeLength = 4;
exports.fields = type.struct({
    auto: type.int32
});