// Sent from the game master console to the server
var type = require('../types');

exports.type = 0x809305a7;
exports.subtype = 0;
exports.subtypeLength = 0;
exports.fields = type.struct({
    // Destination:
    //
    //   0: Comms channel (server generates commsIncoming packet)
    // For destinations 1-6, the game server generates a gameMessage packet.
    //   1: Main Screen
    //   2: Helm
    //   3: Weapons
    //   4: Engineering
    //   5: Science
    //   6: Comms console
    // TODO: make this use the console enum, but with something extra for comms channel
    destination: type.int32,
    sender: type.string, // only for comms channel
    msg: type.string
});