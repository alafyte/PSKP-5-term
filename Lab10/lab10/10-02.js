const net = require('net');

let HOST = '127.0.0.1';
let PORT1 = 40000;
let PORT2 = 50000;

let connections = new Map();

let server1 = net.createServer();
let server2 = net.createServer();

let h = (server) => {
    return (socket) => {
        let serverInterval = null;
        console.log(`Server connected to ${socket.remoteAddress}:${socket.remotePort}`);

        socket.id = (new Date()).toISOString();

        connections.set(socket.id, 0);
        console.log('Socket ID: ', socket.id);

        server.getConnections((e, c) => {
            if (!e) {
                console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort} ` + c);
                for (let [key, value] of connections) {
                    console.log(key, value);
                }
            }
        });

        socket.on('data', (data) => {
            console.log(`DATA: ${socket.remoteAddress}:${socket.remotePort} ` + data.readInt32LE());
            connections.set(socket.id, connections.get(socket.id) + data.readInt32LE());
            console.log(`SUM: ${connections.get(socket.id)}`);
        });

        let buf = Buffer.alloc(4);

        serverInterval = setInterval(() => {
            buf.writeInt32LE(connections.get(socket.id), 0);
            socket.write(buf);
        }, 5000);

        socket.on('error', err => {
            console.log(`ERROR: ${socket.remoteAddress}:${socket.remotePort} ` + err.message);
            clearInterval(serverInterval);
            connections.delete(socket.id)
        });

        socket.on('close', () => {
            console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort} ` + socket.id);
            clearInterval(serverInterval);
            connections.delete(socket.id);
        });
    };
};
server1.on('connection', h(server1));

server1.listen(PORT1, HOST).on('listening', () => {
    console.log(`\nServer is listening: ${HOST}:${PORT1}`)
});

server2.on('connection', h(server2));

server2.listen(PORT2, HOST).on('listening', () => {
    console.log(`\nServer is listening: ${HOST}:${PORT2}`)
});

