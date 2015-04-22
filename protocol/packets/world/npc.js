var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x05;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(7, {
        name:               type.string,
        impulse:            type.float,
        rudder:             type.float,
        maxImpulse:         type.float,
        turnRate:           type.float,
        isEnemy:            type.int32,
        shipType:           type.int32,
        posX:               type.float,

        posY:               type.float,
        posZ:               type.float,
        pitch:              type.float,
        roll:               type.float,
        heading:            type.float,
        velocity:           type.float,
        surrendered:        type.int8,
        unknown16:          type.int16, // maybe surrender chance or shield state

        forShields:         type.float,
        forShieldsMax:      type.float,
        aftShields:         type.float,
        aftShieldsMax:      type.float,
        unknown21:          type.int16, // maybe shieldsActive
        fleet:              type.int8,
        eliteBits:          type.enums.eliteAbility,
        eliteBitsActive:    type.enums.eliteAbility,

        scanned:            type.int32,
        faction:            type.int32,
        unknown27:          type.int32,
        side:               type.int8,
        unknown29:          type.int8,
        unknown30:          type.int8,
        unknown31:          type.int8,
        unknown32:          type.float, // observed -10000

        unknown25:          type.int32,
        unknown26:          type.int32,
        damageBeams:        type.float,
        damageTorpedoes:    type.float,
        damageSensors:      type.float,
        damageManeuver:     type.float,
        damageImpulse:      type.float,
        damageWarp:         type.float,

        damageForShield:    type.float,
        damageAftShield:    type.float,
        shieldFreqA:        type.float,
        shieldFreqB:        type.float,
        shieldFreqC:        type.float,
        shieldFreqD:        type.float,
        shieldFreqE:        type.float
    })
});