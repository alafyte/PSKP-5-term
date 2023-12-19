const net = require('net');

let HOST = '127.0.0.1';
let PORT = 4000;

net.createServer((socket) => {
    console.log(`Server connected to ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', data => {
       console.log(`Server data ${socket.remoteAddress}: ${data}`);
       socket.write(`ECHO: ${data}`);
    });

    socket.on('close', () => {
        console.log(`Server closed: ${socket.remoteAddress}:${socket.remotePort}`);
    });

}).listen(PORT, HOST);

console.log('TCP server listening on port ' + PORT);