// The difficulty and game type
var type = require('../types');

exports.type = 0x3de66711;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    difficulty: type.int32,
    // Values are only meaningful for solo and co-op games
    gameType: type.enums.gameType
});