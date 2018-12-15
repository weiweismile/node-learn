const http = require('http');
// http.createServer(function(request, response) {
//     response.writeHead(200, { 'Content-Type': 'text-plain' });
//     response.end('hello node.js');
// }).listen(8080);


http.createServer(function(request, response) {
    console.log(request.method);
    console.log(request.headers);
    const body = [];
    request.on('data', function(chunk) {
        console.log(chunk, 'chunk');
        body.push(chunk);
    });
    request.on('end', function(request, response) {
        console.log(body, 'body');
        // body = Buffer.concat(body);
        // console.log(body.toString());
    });
}).listen(8080);