// var options = {
//     hostname: 'www.example.com',
//     port: 80,
//     path: '/',
//     method: 'GET',
//     headers: {
//         'Accept-Encoding': 'gzip, deflate'
//     }
// };
// const http = require('http');
// const zlib = require('zlib');
// // 解压data
// http.request(options, function(response) {
//     var body = [];
//     response.on('data', function(chunk) {
//         console.log(chunk, 'chunk');
//         body.push(chunk);
//     });
//     response.on('end', function() {
//         body = Buffer.concat(body);
//         if (response.headers['content-encoding'] === 'gzip') {
//             zlib.gunzip(body, function(err, data) {
//                 console.log(data.toString());
//             })
//         } else {
//             console.log(data.toString());
//         }
//     });
// }).end();


var a, b;
console.log('请输入a的值:');
process.stdin.on('data', function(chunk) {
    if (!a) {
        a = Number(chunk);        
    } else {
        b = Number(chunk);
        process.stdout.write('a*b的结果是'+ a*b);
    }
});
