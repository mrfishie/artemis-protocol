/**
 * Upgrades status of the ship: which upgrades are available.
 *
 * The game UI displays 28 possible upgrades.
 * There is a 7-byte bitmask with 56 bits (28*2).
 * Then there is a 4-byte word with 28 (out of 32) bits set to 1. Maybe upgrades possible for this ship?
 * Then, there are 28 4-byte words, all zeroed out. Are these one 4-byte or 2 2-bytes data fields per upgrade?
 * How does this map to the bitmap??
 */
var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x04;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(7, {
        mask:      type.int32,
        unknown02: type.int32,
        unknown03: type.int32,
        unknown04: type.int32,
        unknown05: type.int32,
        unknown06: type.int32,
        unknown07: type.int32,
        unknown08: type.int32,

        unknown09: type.int32,
        unknown10: type.int32,
        unknown11: type.int32,
        unknown12: type.int32,
        unknown13: type.int32,
        unknown14: type.int32,
        unknown15: type.int32,
        unknown16: type.int32,

        unknown17: type.int32,
        unknown18: type.int32,
        unknown19: type.int32,
        unknown20: type.int32,
        unknown21: type.int32,
        unknown22: type.int32,
        unknown23: type.int32,
        unknown24: type.int32,

        unknown25: type.int32,
        unknown26: type.int32,
        unknown27: type.int32,
        unknown28: type.int32,
        unknown29: type.int32
    })
});