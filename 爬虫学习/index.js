// 爬一张图片
// const https = require('https');
// const fs = require('fs');

// const arr=[];
// let str = '';

// let req = https.request({
//     'protocol': 'https:',
//     'hostname': 'ss1.bdstatic.com',
//     'path': '/kvoZeXSm1A5BphGlnYG/skin/120.jpg?2',
// }, res => {
//     console.log(res, 7777);
//     res.on('data', function(chunk) {
//         console.log(chunk, 888);
//         arr.push(chunk);
//         str += chunk;
//     });
//     res.on('end', function() {
//         let b = Buffer.concat(arr);
//         // buffer二进制数组，转换成一个真正的buffer对象。
//         fs.writeFile('test.jpg', b);
//     });
// });
// req.end();

// 爬豆瓣
const JSDOM = require('jsdom').JSDOM;
const https = require('https');
const arr = [];
let str='';
let req = https.request({
    'protocol': 'https:',
    'hostname': 'movie.douban.com',
    'path': '/subject/26394152/?from=showing',
}, res => {
    res.on('data', function(chunk) {
        arr.push(chunk);
        str += chunk;
        // console.log(str, 8989);
    });
    res.on('end', function() {
        const dom = new JSDOM(str);
        console.log(dom.window.document.querySelector('h1').textContent);
    });
});

req.end();