var type = require('../../types');

// TODO: Some of these updates contain exactly the same properties, maybe they should be merged into one?

exports.type = type.update;
exports.subtype = 0x0c;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(1, {
        posX:       type.float,
        posY:       type.float,
        posZ:       type.float,
        name:       type.string,
        unknown05:  type.int32,
        unknown06:  type.int32,
        unknown07:  type.int32,
        unknown08:  type.int32
    })
});