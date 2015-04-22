var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x11;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(2, {
        damage:     type.int32,
        posX:       type.float,
        unknown03:  type.float, // maybe speedX?
        posY:       type.float,
        unknown05:  type.float, // maybe speedY?
        posZ:       type.float,
        unknown07:  type.float, // maybe speedZ?
        unknown08:  type.int32, // possibly a flag bitmap?

        unknown09:  type.float
    })
});