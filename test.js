const http = require('http');
const fs = require('fs');
const url = require('url');
http.createServer(function(request, response) {
    const pathName = url.parse(request.url).pathname;
    const filePath = __dirname + pathName;
    if (pathName === '/' || pathName === '/index') {
        fs.readFile(filePath, function(err, chunk) {
            if (err) {
                response.writeHead('404', {
                    'content-type': 'text/html'
                });
                response.write('not found');
                response.end();
            } else {
                response.writeHead('200', {
                    'content-type': 'text/html;charset=utf-8'
                });
                response.end('<h1>这是首页111</h1>');
            }
        });
    }
}).listen(8080);