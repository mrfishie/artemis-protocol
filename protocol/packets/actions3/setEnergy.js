// Sets the energy for a system
var type = require('../../types');

exports.type = type.action3;
exports.subtype = 0x04;
exports.subtypeLength = 4;
exports.fields = type.struct({
    value: type.float, // from 0.0 to 1.0; 100% is 0.333
    system: type.enums.system
});