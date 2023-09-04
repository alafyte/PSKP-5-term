let http = require('http');

let getHeaders = (request) => {
    let result = '';
    for (let key in request.headers) {
        result += '<h3>' + key + ": " + request.headers[key] + '</h3>';
    }
    return result;
}

http.createServer((request, response) => {
    let b = '';
    request.on('data', (data) => {
        b += data;
        console.log('data', b);
    });

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    request.on('end', () => response.end(
        '<!DOCTYPE html>' +
        '<html lang="ru">' +
        '<head>' +
        '<title>Задание 3</title>' +
        '</head>' +
        '<body>' +
        '<h1>Структура запроса</h1>' +
        '<h2>Метод: ' + request.method + '</h2>' +
        '<h2>Uri: ' + request.url + '</h2>' +
        '<h2>Версия: ' + request.httpVersion + '</h2>' +
        '<h2>Заголовки: ' + getHeaders(request) + '</h2>' +
        '<h2>Тело: ' + b + '</h2>' +
        '</body>' +
        '</html>'
    ));
}).listen(3000)

console.log('Server running at http://localhost:3000/');