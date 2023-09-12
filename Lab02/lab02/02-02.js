let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/png') {
        const fileName = './cat.jpg';
        let jpg = null;

        fs.stat(fileName, (err, stats) => {
            if (err) {
                console.error('error:', err);
            } else {
                jpg = fs.readFileSync(fileName);
                res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length': stats.size});
                res.end(jpg, 'binary');
            }
        })
    } else {
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8;"});
        res.end("<h2>Not found</h2>");
    }
}).listen(5000);

console.log("Server is running at http://localhost:5000");