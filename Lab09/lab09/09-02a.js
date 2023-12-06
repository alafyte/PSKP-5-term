const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket('ws://localhost:4000');
let k = 0;

ws.on('open', () => {
    const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' });
    let wfile = fs.createWriteStream(`./MyFile${++k}.txt`);
    duplex.pipe(wfile);
});

ws.on('error', error => {
    console.error(error.message);
});