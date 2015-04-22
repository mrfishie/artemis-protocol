var type = require('../../types');

exports.type = type.update;
exports.subtype = 0x02;
exports.subtypeLength = 1;
exports.fields = type.bitmapStruct(3, {
    storesHoming:   type.int8,
    storesNukes:    type.int8,
    storesMines:    type.int8,
    storesEMPs:     type.int8,
    unknown05:      type.int8,
    unloadTime1:    type.float,
    unloadTime2:    type.float,
    unloadTime3:    type.float,

    unloadTime4:    type.float,
    unloadTime5:    type.float,
    unloadTime6:    type.float,
    tubeUsed1:      type.enums.tubeStatus,
    tubeUsed2:      type.enums.tubeStatus,
    tubeUsed3:      type.enums.tubeStatus,
    tubeUsed4:      type.enums.tubeStatus,
    tubeUsed5:      type.enums.tubeStatus,

    tubeUsed6:      type.enums.tubeStatus,
    tubeContents1:  type.enums.ordnance,
    tubeContents2:  type.enums.ordnance,
    tubeContents3:  type.enums.ordnance,
    tubeContents4:  type.enums.ordnance,
    tubeContents5:  type.enums.ordnance,
    tubeContents6:  type.enums.ordnance
});