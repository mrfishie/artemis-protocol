// Sends a keystroke to the server - only useful if keyStroke capture is set, and only for scripted missions
var type = require('../../types');

exports.type = type.action1;
exports.subtype = 0x14;
exports.subtypeLength = 4;
exports.fields = type.struct({
    // See http://msdn.microsoft.com/en-us/library/aa243025.aspx
    keyCode: type.int32
});