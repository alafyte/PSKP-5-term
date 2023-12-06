const WebSocket = require('ws');


setTimeout(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.on('message', mess => {
        console.log('on message: ', mess.toString());
    })

    ws.on('pong', data => {
        console.log('on pong: ', data.toString());
    });

    setInterval(() => {
        console.log('\nClient PING');
        ws.ping('Client PING');
    }, 5000);
}, 500);