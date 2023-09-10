let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    let fileName = './jquery.html';
    if (req.url === "/jquery") {
        fs.stat(fileName, (err, stats) => {
            if (err) {
                console.error('error:', err);
            }
            else {
                let html = fs.readFileSync(fileName);
                res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': stats.size});
                res.end(html);
            }
        })
    }
    else if (req.url === "/api/name") {
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8;"});
        res.end("Русак Наталья Александровна");
    }
}).listen(5000, () => console.log("Server is running at http://localhost:5000"))