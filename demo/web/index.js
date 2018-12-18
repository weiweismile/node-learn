// 处理get、post方法。
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
http.createServer(function(request, response) {
    const pathName = url.parse(request.url).pathname;
    const filePath = __dirname + pathName;
    if (pathName === '/login.html' && request.method.toUpperCase() === 'POST') {
        let post = '';
        request.on('data', function(chunk) {
            post += chunk;
        });
        request.on('end', function() {
            console.log(post, 'post'); // username=11&password=11 post
            console.log(querystring.parse(post), 'query'); // { username: '11', password: '11' }
        });
    } else {
        readFile(filePath, request, response);
    }
}).listen(8080);


function readFile(filePath, request, response) {
    fs.readFile(filePath, function(err, chunk) {
        if (err) {
            console.log(err, 'err');
            response.writeHead('404', {
                'content-type': 'text/html'
            });
            response.write('not found');
            response.end();
        } else {
            response.writeHead('200', {
                'content-type': 'text/html;charset=utf-8'
            });
            response.end(chunk.toString());
        }
    });
}