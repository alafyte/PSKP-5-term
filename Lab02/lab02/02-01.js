let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    let html =  fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}).listen(5000);

console.log("Server is running at http://localhost:5000");