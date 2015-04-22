var net = require('net');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var ParseError = require('./ParseError');

var dataTypes = require('../protocol/types');
var packetHeader = require('../protocol/header');
var packets = require('../protocol/packets');

function Socket(socket, origin) {
    EventEmitter.call(this);

    if (!(socket instanceof net.Socket)) socket = new net.Socket(socket);

    this._socket = socket;
    this._buffer = null;
    this.open = false;

    this.origin = origin || "client";

    this.remoteAddress = null;
    this.remoteFamily = null;
    this.remotePort = null;
    this.localAddress = null;
    this.localPort = null;

    socket.on('connect', this._onConnect.bind(this));
    socket.on('data', this._onData.bind(this));
    socket.on('close', this._onClose.bind(this));
    socket.on('error', this._onError.bind(this));
    socket.on('end', (function() { this.emit('end') }).bind(this));

    socket.on('lookup', (function(err, address, family) {
        if (err) return;

        this.remoteAddress = address;
        this.remoteFamily = family;
        this.remotePort = socket.remotePort;

        this.localAddress = socket.localAddress;
        this.localPort = socket.localPort;
    }).bind(this));

    this.on('packet', function(type, data) {
        console.log(type, data);
    });
}
util.inherits(Socket, EventEmitter);

module.exports = Socket;

Socket.createPacketBuffer = function(origin, name, data) {
    if (!packets.byName.hasOwnProperty(name)) throw new TypeError('Unknown packet ' + name);
    var def = packets.byName[name];

    var buffer = new Buffer(2048);

    // Skip 24 bytes for the header plus as many as the subtype
    buffer.pointer = 24 + def.subtypeLength;

    // The magic happens here:
    def.fields.pack(buffer, data);

    var length = buffer.pointer;

    // Reset pointer so the header is written at the beginning of the buffer
    buffer.pointer = 0;
    var header = packetHeader.pack(buffer, {
        magic: 0xdeadbeef,
        packetLength: length,
        origin: origin,
        bytesRemaining: length - 20,
        type: def.type
    });

    switch (def.subtypeLength) {
        case 1: dataTypes.int8.pack(buffer, def.subtype); break;
        case 2: dataTypes.int16.pack(buffer, def.subtype); break;
        case 4: dataTypes.int32.pack(buffer, def.subtype); break;
    }

    return buffer.slice(0, length);
};

Socket.prototype._onConnect = function() {
    this.open = true;
    this.emit('connect');
};

Socket.prototype._onClose = function() {
    this.open = false;
    this.emit('close');
};

Socket.prototype._onError = function(err) {
    this.emit('error', err);
};

Socket.prototype._onData = function(buffer) {
    if (this._buffer) {
        buffer = Buffer.concat([this._buffer, buffer]);
        this._buffer = null;
    }

    if (buffer.length < 24) {
        this._buffer = buffer;
        return;
    }

    if (!buffer.hasOwnProperty('pointer')) buffer.pointer = 0;

    var initialPointer = buffer.pointer;
    var header = packetHeader.unpack(buffer);

    if (header.magic !== 0xdeadbeef) throw new ParseError('Bad magic number: ' + header.magic, buffer);
    if (header.packetLength !== header.bytesRemaining + 20) {
        throw new ParseError('Packet length (' + header.packetLength + ') and remaining bytes (' + header.bytesRemaining
            + ') mismatch', buffer);
    }

    // Packed too short, rewind and wait for more data to come in
    if (buffer.length < header.packetLength) {
        buffer.pointer = initialPointer;
        this._buffer = buffer;
        return;
    }

    // Contents of the buffer *after* current packet. Will be used after packet has been parsed or an error was
    // encountered
    var remainingBuffer = buffer.slice(initialPointer + header.packetLength);
    this._buffer = null;

    if (!packets.byType.hasOwnProperty(header.type)) {
        // Because this could happen with packets that haven't yet been discovered, we don't want to throw an error
        // TODO: something better than console.warn
        console.warn('Unknown packet type: ' + header.type.toString(16));
        return this._onData(remainingBuffer);
    }

    var subtypeLength = packets.byType[header.type].subtypeLength;
    var subtype = -1; // "Subtype not read yet"

    while (subtype !== 0 && buffer.pointer < initialPointer + header.packetLength) {
        switch (subtypeLength) {
            case 0: subtype = 0; break;
            case 1:
                subtype = dataTypes.int8.unpack(buffer);
                if (subtype === 0 && buffer.pointer + 3 === initialPointer + header.packetLength) {
                    buffer.pointer += 3; // Run when a multi-subtype packet is received and has 4-byte padding at the end
                }
                break;
            case 2: subtype = dataTypes.int16.unpack(buffer); break;
            case 4: subtype = dataTypes.int32.unpack(buffer); break;
        }

        if (!packets.byType[header.type].hasOwnProperty(subtype)) {
            // TODO: something better than console.warn
            console.warn('Unknown packet subtype: ' + header.type.toString(16), subtype.toString(16));
            buffer.pointer = initialPointer;
            console.log('Whole packet was:\n' + buffer.toString('hex'));
            return this._onData(remainingBuffer);
        }

        var packetName = packets.byType[header.type][subtype].name;
        var packet = null;
        try {
            console.log("TRYING");
            packet = packets.byType[header.type][subtype].fields.unpack(buffer);
        } catch (e) {
            var parseError = new ParseError('Error while parsing ' + packetName + ': ' + e.message, buffer);
            parseError.stack = e.stack;
            return this.emit('error', parseError);
        }

        this.emit('packet.' + packetName, packet);
        this.emit('packet', packetName, packet);
    }

    if (buffer.pointer !== initialPointer + header.packetLength) {
        var bytesRead = buffer.pointer - initialPointer;
        var err = new ParseError('Packet length mismatch! Expected ' + header.packetLength + ', read ' + bytesRead, buffer);
        return this.emit('error', parseError);
    }

    return this._onData(remainingBuffer);
};

Socket.prototype.writeBuffer = function(buffer) {
    this._socket.write(buffer);
    return this;
};
Socket.prototype.sendBuffer = Socket.prototype.writeBuffer;

Socket.prototype.write = function(name, data) {
    if (!this.open) return false;

    this.writeBuffer(Socket.createPacketBuffer(this.origin, name, data));
    return true;
};
Socket.prototype.send = Socket.prototype.write;

var delegates = [
    'connect', 'end', 'destroy', 'pause', 'resume', 'setTimeout', 'setNoDelay', 'setKeepAlive',
    'address', 'unref', 'ref'
];
delegates.forEach(function(method) {
    Socket.prototype[method] = function() {
        this._socket[method].apply(this._socket, arguments);
        return this;
    };
});