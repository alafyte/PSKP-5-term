const WebSocket = require('ws');

let n = 0;

const wsserver = new WebSocket.Server({ port: 4000, host: 'localhost' });

wsserver.on('connection', ws => {

    setInterval(() => {
        wsserver.clients.forEach((client) => {
            if (client.readyState === ws.OPEN)
                client.send(`09-03-server: ${++n}`);
        });
    }, 15000);

    setInterval(() => {
        console.log(`\nAvailable: ${wsserver.clients.size} client(s)`);
        ws.ping(`Server ping: ${wsserver.clients.size} client(s)`);
    }, 5000);

    ws.on('pong', data => {
        console.log(`on pong: ${data.toString()}`);
    });

    ws.on('message', data => {
        console.log('on message: ', data.toString());
        ws.send(data);
    })
});

wsserver.on('error', e => { console.error(e.message) });