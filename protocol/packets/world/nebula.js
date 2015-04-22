var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x0a;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(1, {
        posX:   type.float,
        posY:   type.float,
        posZ:   type.float,
        colorR: type.float,
        colorG: type.float,
        colorB: type.float
    })
});