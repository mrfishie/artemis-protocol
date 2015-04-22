var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x06;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(2, {
        name: type.string,
        forShields: type.float,
        aftShields: type.float,
        unknown04: type.int32, // Looks like an incremental 0-based station ID
        type: type.int32,
        posX: type.float,
        posY: type.float,
        posZ: type.float,

        unknown09: type.int32,
        unknown10: type.int32,
        unknown11: type.int32,
        unknown12: type.int16,
        unknown13: type.int16,
        unknown14: type.int16,
        unknown15: type.int16
    })
});