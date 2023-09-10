let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    const fileName = './cat.jpg';
    let jpg = null;

    fs.stat(fileName, (err, stats) => {
        if (err) {
            console.error('error:', err);
        }
        else {
            jpg = fs.readFileSync(fileName);
            res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length': stats.size});
            res.end(jpg, 'binary');
        }
    })
}).listen(5000);

console.log("Server is running at http://localhost:5000");