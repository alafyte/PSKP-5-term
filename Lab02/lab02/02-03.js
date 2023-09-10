let http = require('http');

http.createServer((req, res) => {
    if (req.url === "/api/name" && req.method === 'GET') {
        res.writeHead("Content-Type", "text/plain; charset=utf-8;");
        res.end("Русак Наталья Александровна");
    } else {
        res.writeHead("Content-Type", "text/html; charset=utf-8;");
        res.write("<h2>Not found</h2>");
        res.end();
    }
}).listen(5000, () => console.log("Server is running at http://localhost:5000"));

