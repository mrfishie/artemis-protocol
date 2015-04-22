var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x0b;
exports.subtypeLength = 4;
exports.fields = type.struct({
    frequency: type.enums.beamFrequency
});