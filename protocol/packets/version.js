var type = require('../types');

exports.type = 0xe548e74a;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    unknown01:  type.int32,
    unknown02:  type.int32,
    major:      type.int32,
    minor:      type.int32,
    patch:      type.int32
});