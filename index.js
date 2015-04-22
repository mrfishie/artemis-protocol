/**
 * A decorator for Node's net class that uses the Artemis protocol
 */

var net = require('net');
var Socket = require('./lib/Socket');

function createServer(options, listener) {
    // todo
}
exports.createServer = createServer;

function connect() {
    return new Socket(net.connect.apply(net, arguments));
}
exports.connect = connect;
exports.createConnection = connect;

exports.Socket = Socket;