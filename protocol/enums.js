/**
 * Enumeration values to make understanding packet contents simpler
 */

var type = require('./types');

exports.beamFrequency = enumType(type.int32, {
    0x00: 'A',
    0x01: 'B',
    0x02: 'C',
    0x03: 'D',
    0x04: 'E'
});

exports.commTarget = enumType(type.int32, {
    0x00: 'player',
    0x01: 'enemy',
    0x02: 'station',
    0x03: 'other'
});

exports.connection = enumType(type.int32, {
    0x01: 'server',
    0x02: 'client'
});

exports.consoleStatus = enumType(type.int8, {
    0x00: 'available',
    0x01: 'mine',
    0x02: 'unavailable'
});

exports.console = enumType(type.int32, {
    0x00: 'mainScreen',
    0x01: 'helm',
    0x02: 'weapons',
    0x03: 'engineering',
    0x04: 'science',
    0x05: 'communications',
    0x06: 'data',
    0x07: 'observer',
    0x08: 'captainsMap',
    0x09: 'gameMaster'
});

exports.drive = enumType(type.int32, {
    0x00: 'warp',
    0x01: 'jump'
});

exports.eliteAbility = enumBitType(type.int32, {
    0x0001: 'stealth',
    0x0002: 'lowVis',
    0x0004: 'cloak',
    0x0008: 'het',
    0x0010: 'warp',
    0x0020: 'teleport',
    0x0040: 'tractor',
    0x0080: 'drones',
    0x0100: 'antiMine',
    0x0200: 'antiTorp',
    0x0400: 'shieldDrain'
});

exports.gameType = enumType(type.int32, {
    0x00: 'seige',
    0x01: 'singleFront',
    0x02: 'doubleFront',
    0x03: 'deepStrike',
    0x04: 'peaceTime',
    0x05: 'borderWar'
});

exports.mainScreen = enumType(type.int32, {
    0x00: 'fore',
    0x01: 'port',
    0x02: 'starboard',
    0x03: 'aft',
    0x04: 'tactical',
    0x05: 'longRange',
    0x06: 'status'
});

exports.object = enumType(type.int8, {
    0x01: 'player',
    0x02: 'weapons',
    0x03: 'engineering',
    0x04: 'npc',
    0x05: 'base',
    0x06: 'mine',
    0x07: 'anomaly',
    0x09: 'nebula',
    0x0a: 'torpedo',
    0x0b: 'blackHole',
    0x0c: 'asteroid',
    0x0d: 'mesh',
    0x0e: 'monster',
    0x0f: 'whale',
    0x10: 'drone'
});

exports.ordnance = enumType(type.int32, {
    0x00: 'homing',
    0x01: 'nuke',
    0x02: 'mine',
    0x03: 'emp'
});

exports.perspective = enumType(type.int32, {
    0x00: 'first',
    0x01: 'third'
});

exports.system = enumType(type.int32, {
    0x00: 'beams',
    0x01: 'torpedos',
    0x02: 'sensors',
    0x03: 'maneuvering',
    0x04: 'impulse',
    0x05: 'drive',
    0x06: 'foreShields',
    0x07: 'aftShields'
});

exports.tubeStatus = enumType(type.int8, {
    0x00: 'unloaded',
    0x01: 'loaded',
    0x02: 'loading',
    0x03: 'unloading'
});

// Converts an object to an enumeration type
function enumType(type, values) {
    var internal = Object.keys(values);
    var fieldCount = internal.length;
    var external = [];
    for (var i = 0; i < fieldCount; i++) {
        external[i] = values[internal[i]];
    }

    return {
        values: values,
        _internal: internal,
        _external: external,
        fieldCount: fieldCount,

        unpack: function(buffer) {
            return values[type.unpack(buffer)];
        },
        pack: function(buffer, data) {
            var index = external.indexOf(data);
            if (index === -1) throw new TypeError('Unknown value "' + data + '" in enum');

            type.pack(buffer, internal[index]);
        }
    };
}

function enumBitType(type, values) {
    var internal = Object.keys(values);
    var fieldCount = internal.length;
    var external = [];
    for (var i = 0; i < fieldCount; i++) {
        external[i] = values[internal[i]];
    }

    return {
        values: values,
        _internal: internal,
        _external: external,
        fieldCount: fieldCount,

        unpack: function(buffer) {
            var results = [];
            var value = type.unpack(buffer);

            for (var i = 0; i < fieldCount; i++) {
                var internalVal = internal[i], maskVal = value & internalVal;
                if (maskVal === internalVal) results.push(external[i]);
            }
            return results;
        },
        pack: function(buffer, data) {
            var result = 0;

            for (var i = 0; i < data.length; i++ ){
                var dataVal = data[i];
                var index = external.indexOf(dataVal);
                if (index === -1) throw new TypeError('Unknown value "' + data + '" in enum');

                result = result | internal[index];
            }

            type.pack(buffer, result);
        }
    };
}