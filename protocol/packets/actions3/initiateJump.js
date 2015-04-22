var type = require('../../types');

exports.type = type.action3;
exports.subtype = 0x05;
exports.subtypeLength = 4;
exports.fields = type.struct({
    bearing: type.float, // from 0.0 to 1.0 (bearing from 0 to 360 divided by 360)
    distance: type.float // from 0.0 to 1.0 (1.0 means 50k metres)
});