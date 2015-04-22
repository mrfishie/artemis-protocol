var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x10;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(2, {
        name:       type.string,
        unknown02:  type.int32,
        unknown03:  type.int32,
        posX:       type.float,
        posY:       type.float,
        posZ:       type.float,
        pitch:      type.float,
        roll:       type.float,

        heading:    type.float,
        unknown09:  type.float,
        unknown10:  type.float,
        unknown11:  type.float, // observed from 0 to 0.855
        unknown12:  type.float  // observed from 0.5 to 1.36
    })
});