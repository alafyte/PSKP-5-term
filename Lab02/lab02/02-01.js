let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    if (req.url === "/html") {
        let html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    } else {
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8;"});
        res.end("<h2>Not found</h2>");
    }
}).listen(5000);

console.log("Server is running at http://localhost:5000");