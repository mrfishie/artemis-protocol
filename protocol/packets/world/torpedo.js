var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x0b;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(1, {
        posX:           type.float,
        posY:           type.float,
        posZ:           type.float,
        speedX:         type.float,
        speedY:         type.float,
        speedZ:         type.float,
        ordnanceType:   type.enums.ordnance,
        unknown08:      type.int32
    })
});