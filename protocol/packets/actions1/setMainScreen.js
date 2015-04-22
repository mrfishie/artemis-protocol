var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x01;
exports.subtypeLength = 4;
exports.fields = type.struct({
    view: type.enums.mainScreen
});