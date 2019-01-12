const https = require('https');
const fs = require('fs');

const arr=[];
let str = '';

let req = https.request({
    'protocol': 'https:',
    'hostname': 'baike.baidu.com',
    'path': '/item/GBK字库/3910360?fr=aladdin',
}, res => {
    console.log(res, 7777);
    res.on('data', function(chunk) {
        console.log(chunk, 888);
        arr.push(chunk);
        str += chunk;
    });
    res.on('end', function() {
        let b = Buffer.concat(arr);
        fs.writeFile('test.jpg', b);
    });
});
req.end();