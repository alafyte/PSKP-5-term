const WebSocket = require('ws');


const wss = new WebSocket.Server({port: 4000, host: 'localhost'});
wss.on('connection', ws => {
    let k = 0;
    ws.on('message', mess => {
        console.log('\nmessage: ', mess.toString());
        let data = JSON.parse(mess);
        ws.send(JSON.stringify({
            server: ++k, client: data.client, timestamp: new Date().toISOString()
        }, null, 2))
    });
});
wss.on('error', error => {
    console.error(error.message);
});