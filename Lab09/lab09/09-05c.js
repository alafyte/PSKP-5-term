const rpcClient = require('rpc-websockets').Client;
let ws = new rpcClient('ws://localhost:4000/');

ws.on('open', () => {
    ws.login({ login: 'qwerty', password: '1234' })
        .then(async () => await calculate()).then(() => ws.close());
});


async function calculate() {
    console.log('\nresult = ' +
        (await ws.call('sum',
                [
                    await ws.call('square', [3]),
                    await ws.call('square', [5, 4]),
                    await ws.call('mul', [3, 5, 7, 9, 11, 13])
                ])
            + (await ws.call('fib', [7])).slice(-1)
            * await ws.call('mul', [2, 4, 6]))
    );
}