var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x01;
exports.subtypeLength = 0;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(5, {
        weaponsTarget:      type.int32,
        impulse:            type.float,
        rudder:             type.float,
        impulseMax:         type.float,
        turnRate:           type.float,
        autoBeams:          type.int8,
        warp:               type.int8,
        energy:             type.float,

        shieldState:        type.int16,
        playerIndex:        type.int32,
        shipType:           type.int32,
        posX:               type.float,
        posY:               type.float,
        posZ:               type.float,
        pitch:              type.float,
        roll:               type.float,

        heading:            type.float,
        velocity:           type.float,
        unknown19:          type.int16,
        name:               type.string,
        forShields:         type.float,
        forShieldsMax:      type.float,
        aftShields:         type.float,
        aftShieldsMax:      type.float,

        dockingBase:        type.int32, // ID of the base being docked with
        redAlert:           type.int8,
        unknown27:          type.float,
        mainScreen:         type.int8, // what is being shown on the main screen
        beamFrequency:      type.int8,
        remainingCoolant:   type.int32,
        scienceTarget:      type.int32,
        captainTarget:      type.int32,

        driveType:          type.enums.drive,
        scanningTarget:     type.float,
        scanningProgress:   type.float,
        reverse:            type.int8,
        diveRise:           type.float,
        unknown38:          type.int16
    })
});