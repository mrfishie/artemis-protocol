var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x03;
exports.subtypeLength = 1;
exports.fields = type.struct({
    id: type.int32,
    data: type.bitmapStruct(4, {
        heatBeams:          type.float,
        heatTorpedoes:      type.float,
        heatSensors:        type.float,
        heatManeuver:       type.float,
        heatImpulse:        type.float,
        heatWarp:           type.float,
        heatForShields:     type.float,
        heatAftShields:     type.float,

        energyBeams:        type.float,
        energyTorpedoes:    type.float,
        energySensors:      type.float,
        energyManeuver:     type.float,
        energyImpulse:      type.float,
        energyWarp:         type.float,
        energyForShields:   type.float,
        energyAftShields:   type.float,

        coolantBeams:       type.int8,
        coolantTorpedoes:   type.int8,
        coolantSensors:     type.int8,
        coolantManeuver:    type.int8,
        coolantImpulse:     type.int8,
        coolantWarp:        type.int8,
        coolantForShields:  type.int8,
        coolantAftShields:  type.int8
    })
});