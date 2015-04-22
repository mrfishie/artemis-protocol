/**
 * Data types contained in the net protocol.
 *
 * Data types are plain objects like this:
 *
 * var type = {
 *     unpack: function(buffer) {},
 *       pack: function(buffer, value) {}
 * }
 *
 * Assume that the buffer parameter is a Buffer object with an extra "pointer" property.
 * The job of both pack and unpack is to read from the buffer at the position indicated
 * by the pointer (int, in bytes), and advance the pointer as needed.
 *
 * The Artemis SBS net protocol uses little-endian everywhere. No reason to implement any
 * endiannes switching logic here.
 */

//var ParseError = require('../lib/ParseError');

// Packet group names
// todo: maybe add subtypeLength in here somehow?
exports.gameMessage = 0xf754c8fe;
exports.update = 0x80803df9;
exports.action1 = 0x4c821d3c;
exports.action2 = 0x69cc01d9;
exports.action3 = 0x0351a5ac;

exports.int8 = {
    unpack: function(buffer) {
        var value = buffer.readUInt8(buffer.pointer);
        buffer.pointer += 1;
        return value;
    },
    pack: function(buffer, value) {
        buffer.writeUInt8(value || 0, buffer.pointer);
        buffer.pointer += 1;
    }
};

exports.int16 = {
    unpack: function(buffer) {
        var value = buffer.readUInt16LE(buffer.pointer);
        buffer.pointer += 2;
        return value;
    },
    pack: function(buffer, value) {
        buffer.writeUInt16LE(value || 0, buffer.pointer);
        buffer.pointer += 2;
    }
};

exports.int32 = {
    unpack: function(buffer) {
        var value = buffer.readUInt32LE(buffer.pointer);
        buffer.pointer += 4;
        return value;
    },
    pack: function(buffer, value) {
        buffer.writeUInt32LE(value || 0, buffer.pointer);
        buffer.pointer += 4;
    }
};

exports.float = {
    unpack: function(buffer) {
        var value = buffer.readFloatLE(buffer.pointer);
        buffer.pointer += 4;
        return value;
    },
    pack: function(buffer, value) {
        buffer.writeFloatLE(value || 0, buffer.pointer);
        buffer.pointer += 4;
    }
};

exports.string = {
    unpack: function(buffer) {
        var strLen = buffer.readUInt32LE(buffer.pointer) * 2;
        if (strLen > 1024) {
            throw new TypeError("String length seems too long: " + strLen + "\nString chars seems to read: "
                + buffer.toString('ascii', buffer.pointer + 4, buffer.pointer + 8));
        }

        var str = buffer.toString('utf16le', buffer.pointer + 4, buffer.pointer + strLen + 2);
        var strEnd = buffer.readUInt16LE(buffer.pointer + strLen + 2);
        if (strEnd !== 0) throw new TypeError('String does not end with 0x0000');

        buffer.pointer += strLen + 4;
        return str;
    },
    pack: function(buffer, str) {
        var strLen = str.length;
        buffer.writeUInt32LE(strLen + 1, buffer.pointer);
        buffer.pointer += 4;
        buffer.write(str, buffer.pointer, strLen * 2, 'utf16le');
        buffer.pointer += strLen * 2;
        buffer.writeUInt16LE(0, buffer.pointer);
        buffer.pointer += 2;
    }
};

// This is only on the welcome packet; all other strings are UTF-16.
exports.asciiString = {
    unpack: function(buffer) {
        var strLen = buffer.readUInt32LE(buffer.pointer);
        var str = buffer.toString('ascii', buffer.pointer + 4, buffer.pointer + strLen + 4);
        buffer.pointer += 4 + strLen;
        return str;
    },
    pack: function(buffer, str) {
        var strLen = str.length;
        buffer.writeUInt32LE(strLen + 1, buffer.pointer);
        buffer.pointer += 4;
        buffer.write(str, buffer.pointer, strLen, 'ascii');
        buffer.pointer += strLen;
    }
};

/**
 * A struct is roughly equal to a map/dictionary, as it will pack and unpack to/from a plain object.
 * For any given struct, create a new instance, passing the struct fields in a plain object
 *
 * @param {Object} fields
 * @constructor
 */
function Struct(fields) {
    this.fieldNames = Object.keys(fields);
    this.fieldTypes = [];
    this.fieldCount = this.fieldNames.length;
    for (var i = 0; i < this.fieldCount; i++) {
        this.fieldTypes[i] = fields[this.fieldNames[i]];
    }
}

Struct.prototype.unpack = function(buffer) {
    var value = {};
    for (var i = 0; i < this.fieldCount; i++) {
        value[this.fieldNames[i]] = this.fieldTypes[i].unpack(buffer);
    }
    return value;
};

Struct.prototype.pack = function(buffer, data) {
    for (var i = 0; i < this.fieldCount; i++) {
        if (data.hasOwnProperty(this.fieldNames[i])) this.fieldTypes[i].pack(buffer, data[this.fieldNames[i]]);
        else this.fieldTypes[i].pack(buffer, undefined);
    }
};

// Expose a function for simplicity (so you don't have to always type 'new')
exports.struct = function(fields) {
    return new Struct(fields);
};

/**
 * Pretty much like a struct, but prepended by a bitmap - if a bit is 1, then the field is defined;
 * if 0, the value for that field is undefined.
 *
 * The order in which the fields is defined is obviously critical to match the bits in the bitmap!
 * Bitmap length is always in bytes. Some of the bits might be unused.
 *
 * @param {Number} bitmapLength
 * @param {Object} fields
 * @constructor
 */
function BitmapStruct(bitmapLength, fields) {
    this.bitmapLength = bitmapLength;
    this.fieldNames = Object.keys(fields);
    this.fieldTypes = [];
    this.fieldCount = this.fieldNames.length;
    for (var i = 0; i < this.fieldCount; i++) {
        this.fieldTypes[i] = fields[this.fieldNames[i]];
    }
}

BitmapStruct.prototype.unpack = function(buffer) {
    var bitmap = new Array(this.bitmapLength);
    for (var i = 0; i < this.bitmapLength; i++) {
        bitmap[i] = exports.int8.unpack(buffer);
    }
    var value = {};
    var x = 0;
    for (var byte = 0; byte < this.bitmapLength; byte++) {
        for (var bit = 0; bit < 8 && x < this.fieldCount; bit++) {
            if (bitmap[byte] && 1 << bit) value[this.fieldNames[x]] = this.fieldTypes[x].unpack(buffer);
            x++;
        }
    }
    return value;
};

BitmapStruct.prototype.pack = function(buffer, data) {
    var bitmap = new Array(this.bitmapLength);
    for (var i = 0; i < this.bitmapLength; i++) {
        bitmap[i] = 0;
    }

    var x = 0;
    for (var byte = 0; byte < this.bitmapLength; byte++) {
        for (var bit = 0; bit < 8; bit++) {
            if (data.hasOwnProperty(this.fieldNames[x])) bitmap[byte] += 1 << bit;
            x++;
        }
        exports.int8.pack(buffer, bitmap[byte]);
    }

    for (var y = 0; y < this.fieldCount; y++) {
        if (data.hasOwnProperty(this.fieldNames[y]))
            this.fieldTypes[y].pack(buffer, data[this.fieldNames[y]]);
    }
};

exports.bitmapStruct = function(bitmapLength, fields) {
    return new BitmapStruct(bitmapLength, fields);
};

/**
 * Similar in the consruction to a BitmapStruct, this is basically multiple structs
 * one after the other, 1-indexed.
 * TODO: maybe instead of converting fields to a struct we should accept any data type
 *       to support single-item arrays
 *
 * @param {Number} length
 * @param {Object} fields
 * @constructor
 */
function StaticSizeArray(length, fields) {
    this._length = length;
    this._struct = exports.struct(fields);
}

StaticSizeArray.prototype.unpack = function(buffer) {
    var value = [];
    for (var i = 0; i < this._length; i++) {
        value[i + 1] = this._struct.unpack(buffer);
    }
    return value;
};

StaticSizeArray.prototype.pack = function(buffer, data) {
    for (var i = 0; i < this._length; i++) {
        this._struct.pack(buffer, data[i + 1] || {});
    }
};

exports.staticSizeArray = function(length, fields) {
    return new StaticSizeArray(length, fields);
};

/**
 * An array with an arbitrary number of concatenated structs. If the byte after a struct
 * is equal to the given boundary marker, thats the end of the array.
 * TODO: maybe instead of converting fields to a struct we should accept any data type
 *       to support single-item arrays
 *
 * @param {Number} marker
 * @param {Object} fields
 * @constructor
 */
function ByteBoundArray(marker, fields) {
    this._marker = marker;
    this._struct = exports.struct(fields);
}

ByteBoundArray.prototype.unpack = function(buffer) {
    var value = [];
    var i = 0;
    while (buffer.readUInt8(buffer.pointer) !== this._marker) {
        value[i + 1] = this._struct.unpack(buffer);
        i++;
    }
    buffer.pointer += 1;
    return value;
};

ByteBoundArray.prototype.pack = function(buffer, data) {
    for (var i = 0; i < data.length; i++) {
        this._struct.pack(buffer, data[i + 1] || {});
    }
    buffer.writeUInt8(this._marker, buffer.pointer);
};

exports.boundArray = function(marker, fields) {
    return new ByteBoundArray(marker, fields);
};

/**
 * Similar to a Struct except with values of an enum, and accepts/returns objects with the enums
 * 'external' values.
 *
 * @param {Object} enumType The enum object
 * @param {Object} type The type for properties
 * @constructor
 */
function EnumArray(enumType, type) {
    this.enum = enumType;
    this.fieldType = type;
}

EnumArray.prototype.unpack = function(buffer) {
    var value = {};
    for (var i = 0; i < this.enum.fieldCount; i++) {
        value[this.enum._external[i]] = this.fieldType.unpack(buffer);
    }
    return value;
};

EnumArray.prototype.pack = function(buffer, data) {
    for (var i = 0; i < this.enum.fieldCount; i++) {
        if (data.hasOwnProperty(this.enum._external[i])) this.fieldType.pack(buffer, data[this.enum._external[i]]);
        else this.fieldType.pack(buffer, undefined);
    }
};

exports.enumArray = function(enumType, type) {
    return new EnumArray(enumType, type);
};

exports.enums = require('./enums');