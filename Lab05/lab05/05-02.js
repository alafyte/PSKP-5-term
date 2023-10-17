const http = require('http');
const fs = require('fs');
const url = require('url');
const {parse} = require('querystring');
const nodemailer = require("nodemailer");


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if (url.parse(req.url).pathname === '/' && req.method === 'GET') {
        res.end(fs.readFileSync("./05-02.html"));
    } else if (url.parse(req.url).pathname === '/' && req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data.toString();
        });
        req.on('end', () => {
            let params = parse(body);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: false,
                service: "Gmail",
                auth: {
                    user: params.sender,
                    pass: params.password,
                },
            });

            const options = {
                from: params.sender,
                to: params.receiver,
                subject: "Lab05",
                text: params.message,
            };

            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                    res.end(`<h1>Error: ${err.message}</h1>`)
                } else {
                    console.log(info);
                    res.end(`<h1>OK: ${params.receiver}, ${params.sender}, ${params.message}</h1>`);
                }
            });

        })
    } else {
        res.end(`<h1>Not support</h1>`);
    }

}).listen(5000, () => console.log('Server is running at http://localhost:5000'));
