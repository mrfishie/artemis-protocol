// The packet header definition
var type = require('./types');

module.exports = type.struct({
    magic:          type.int32,
    packetLength:   type.int32,
    origin:         type.enums.connection, // 1 = from server; 2 = from client
    unknown:        type.int32,
    bytesRemaining: type.int32,
    type:           type.int32
});