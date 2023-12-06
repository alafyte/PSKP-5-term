const WebSocket = require("ws");
const fs = require("fs");

const wss = new WebSocket.Server({ port: 4000, host: 'localhost' });

wss.on('connection', ws => {
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
    let rfile = fs.createReadStream('./download/ServerFile.txt');
    rfile.pipe(duplex);
});

wss.on('error', error => {
    console.error(error.message);
});