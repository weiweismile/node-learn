const https = require('https');
const fs = require('fs');

const arr=[];
let str = '';

let req = https.request({
    'protocol': 'https:',
    'hostname': 'ss1.bdstatic.com',
    'path': '/kvoZeXSm1A5BphGlnYG/skin/120.jpg?2',
}, res => {
    console.log(res, 7777);
    res.on('data', function(chunk) {
        console.log(chunk, 888);
        arr.push(chunk);
        str += chunk;
    });
    res.on('end', function() {
        let b = Buffer.concat(arr);
        // 将其转换成一个真正的buffer对象。
        fs.writeFile('test.jpg', b);
    });
});
req.end();



// ?????二进制转换问题