var packetList = {
    actions1:           folder(require('./actions1')),
    actions2:           folder(require('./actions2')),
    actions3:           folder(require('./actions3')),
    message:            folder(require('./message')),
    world:              folder(require('./world')),
    beamFired:          require('./beamFired'),
    commsIncoming:      require('./commsIncoming'),
    consoles:           require('./consoles'),
    damconInfo:         require('./damconInfo'),
    difficulty:         require('./difficulty'),
    gameMasterMessage:  require('./gameMasterMessage'),
    heartbeat:          require('./heartbeat'),
    incomingAudio:      require('./incomingAudio'),
    intel:              require('./intel'),
    remove:             require('./remove'),
    version:            require('./version'),
    welcome:            require('./welcome')
};

function folder(obj) {
    obj._isFolder = true;
    return obj;
}

var packets = {}, packetsByType = {};
function expandPackets(obj) {
    for (var name in obj) {
        if (!obj.hasOwnProperty(name)) continue;

        var packet = obj[name];
        if (packet._isFolder) expandPackets(packet);
        else packets[name] = packet;
    }
}
expandPackets(packetList);

console.log(packets);

for (var name in packets) {
    if (!packets.hasOwnProperty(name)) continue;
    var packet = packets[name];

    if (!packetsByType.hasOwnProperty(packet.type)) {
        packetsByType[packet.type] = { subtypeLength: packet.subtypeLength };
    }
    packetsByType[packet.type][packet.subtype] = { name: name, fields: packet.fields };
}

exports.byName = packets;
exports.byType = packetsByType;